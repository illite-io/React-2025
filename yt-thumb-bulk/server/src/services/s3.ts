import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import type { Readable } from "stream";

export function s3ClientFromEnv() {
  const endpoint = process.env.S3_ENDPOINT;
  const forcePathStyle = process.env.S3_FORCE_PATH_STYLE === "true";
  return new S3Client({
    region: process.env.S3_REGION,
    endpoint,
    forcePathStyle,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY!,
      secretAccessKey: process.env.S3_SECRET_KEY!
    }
  });
}

export async function uploadStreamToS3(params: {
  client: S3Client;
  bucket: string;
  key: string;
  body: Readable;
  expiresDays: number;
}) {
  const up = new Upload({
    client: params.client,
    params: {
      Bucket: params.bucket,
      Key: params.key,
      Body: params.body,
      ContentType: "application/zip",
      Tagging: `expire-in-days=${params.expiresDays}`
    }
  });
  await up.done();
}