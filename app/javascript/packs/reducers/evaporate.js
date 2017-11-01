import AWS from "aws-sdk";
import Evaporate from "evaporate";

export default function (state = null, action) {
    switch (action.type) {
    case "UPDATE_CONFIGURATION":
      const evaporate = Evaporate.create({
        signerUrl: action.configuration.s3signerurl,
        aws_key: action.configuration.s3key,
        bucket: action.configuration.s3bucket,
        computeContentMd5: true,
        cryptoMd5Method: (data) => { AWS.util.crypto.md5(data, 'base64') },
        cryptoHexEncodedHash256: (data) => { return AWS.util.crypto.sha256(data, 'hex'); }
      })
      return evaporate;
    default:
        return state;
    }
}
