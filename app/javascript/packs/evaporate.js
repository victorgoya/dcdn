import AWS from "aws-sdk";
import Evaporate from "evaporate";
import store from "./store";

export function createEvaporate() {
  const { configuration, currentToken } = store.getState();

  const evaporate = Evaporate.create({
    signerUrl: configuration.s3signerurl,
    aws_key: configuration.s3key,
    bucket: configuration.s3bucket,
    computeContentMd5: true,
    cryptoMd5Method: (data) => { AWS.util.crypto.md5(data, 'base64') },
    cryptoHexEncodedHash256: (data) => { return AWS.util.crypto.sha256(data, 'hex'); },
    signHeaders: {
      Authorization: `Bearer ${currentToken}`
    }
  })
  return (evaporate);
}
