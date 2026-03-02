const VehicleInOut = require('../models/vehicleInOutModel');
const Rule = require('../models/ruleModel');
const { ComputerVisionClient } = require('@azure/cognitiveservices-computervision');
const { ApiKeyCredentials } = require('@azure/ms-rest-js');
const sharp = require('sharp');

const subscriptionKey = "<< AZURE SUBS KEY >>";
const endpoint = "<< AZURE CV ENDPOINT >>";

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': subscriptionKey } }),
  endpoint
);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const create = async (req, res) => {
  try {
    var inoutLog = req.body;

    if (!inoutLog.VImage) {
      return res.status(400).json({ message: 'Image data is required' });
    }

    // Fetch validation regexes from the rules table
    const regexKeys = ['NumberPlateValidation1', 'NumberPlateValidation2', 'NumberPlateValidation3'];
    const regexRules = await Promise.all(regexKeys.map(key => Rule.findByKey(key)));
    const regexes = regexRules.filter(rule => rule).map(rule => new RegExp(rule.value.trim()));

    // Decode base64 image
    const imageBuffer = Buffer.from(inoutLog.VImage.replace("data:image/png;base64,",""), 'base64');

    // Resize image
    const resizedImageBuffer = await sharp(imageBuffer)
      .resize(800)
      .jpeg({ quality: 80 })
      .toBuffer();
    inoutLog.VImage = resizedImageBuffer.toString('base64');

    // Call Azure Computer Vision
    const readResult = await computerVisionClient.readInStream(resizedImageBuffer);
    const operationId = readResult.operationLocation.split('/').slice(-1)[0];

    let result;
    do {
      result = await computerVisionClient.getReadResult(operationId);
      await sleep(1000);
    } while (result.status !== 'succeeded' && result.status !== 'failed');

    let detectedText = '';
    if (result.status === 'succeeded') {
      console.log('Azure Computer Vision result:', JSON.stringify(result, null, 2));
      for (const textResult of result.analyzeResult.readResults) {
        for (const line of textResult.lines) {
          detectedText += line.text;
        }
      }

      // remove all except alphanumeric characters from detected text
      detectedText = detectedText.replace(/[^a-zA-Z0-9]/g, '');
      console.log('Detected text after cleaning:', detectedText);

      matchingText = '';
      for (const regex of regexes) {
        const match = detectedText.match(regex);
        if (match) {
          matchingText = match[0]?.trim().replace(/\s/g, '');
          break;
        }
      }
    }
    
    inoutLog.VehicleNumber = matchingText;

    if (!inoutLog.VehicleNumber) {
        return res.status(400).json({ message: 'Could not detect vehicle number from image' });
    }

    const vehicleEntry = await VehicleInOut.findByVN(inoutLog.VehicleNumber);
    if(vehicleEntry?.Id){
      // Vehicle already in, to log the out time
      VehicleInOut.update(vehicleEntry.Id, { 
        OutTime: new Date(), 
        VehicleOutImage: inoutLog.VImage, 
        OutGate: inoutLog.gatename 
      });
      return res.status(200).json({ message: 'Vehicle out logged successfully', id: vehicleEntry.Id });
    }
    else{
      const newEntryId = await VehicleInOut.create({
        VehicleNumber: inoutLog.VehicleNumber,
        InTime: new Date(),
        VehicleInImage: inoutLog.VImage,
        InGate: inoutLog.GateName,
        userId: inoutLog.UserId
      });
      res.status(201).json({ message: 'Vehicle in/out entry created successfully', 
        Id: newEntryId,
        VehicleNumber: inoutLog.VehicleNumber,
        InTime: new Date(),
        InGate: inoutLog.GateName,
        UserId: inoutLog.UserId 
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getAll = async (req, res) => {
  try {
    const entries = await VehicleInOut.findAll();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getById = async (req, res) => {
  try {
    const entry = await VehicleInOut.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const check = async (req, res) => {
  try {
    const entry = await VehicleInOut.check(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const update = async (req, res) => {
  try {
    const affectedRows = await VehicleInOut.update(req.params.id, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json({ message: 'Entry updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const del = async (req, res) => {
  try {
    const affectedRows = await VehicleInOut.delete(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  create,
  getAll,
  check,
  getById,
  update,
  delete: del
};
