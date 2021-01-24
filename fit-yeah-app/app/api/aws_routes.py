from .auth_routes import validation_errors_to_error_messages
from werkzeug.datastructures import ImmutableMultiDict
from werkzeug.utils import secure_filename
from flask import Blueprint, request
import json
import boto3
from botocore.exceptions import ClientError
import logging
import uuid
import os
import mimetypes

aws_routes = Blueprint('aws', __name__)


s3 = boto3.client('s3',
                  aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
                  aws_secret_access_key=os.environ.get(
                      'AWS_SECRET_ACCESS_KEY_ID'))

BUCKET_NAME = os.environ.get('BUCKET_NAME')


@aws_routes.route('/upload', methods=['POST'])
def upload_file(data=None, BUCKET_NAME=BUCKET_NAME, object_name=None):
    data = request.files['image']

    if object_name is None:
        object_name = uuid.uuid4().hex
    try:
        response = s3.upload_fileobj(data, BUCKET_NAME, object_name)
    except ClientError as e:
        logging.error(e)
        return False

    return {'img_url': f'https://fit-yeah.s3.amazonaws.com/{object_name}'}


@aws_routes.route('/upload/video', methods=['POST'])
def upload_video(data=None, BUCKET_NAME=BUCKET_NAME, object_name=None):
    mimeType = request.form['mimeType']
    data = request.files['video']

    if object_name is None:
        object_name = uuid.uuid4().hex
    try:
        response = s3.upload_fileobj(data, BUCKET_NAME, object_name,
                                     ExtraArgs={
                                         'ContentType': f'video/{mimeType}'})
    except ClientError as e:
        logging.error(e)
        return False

    return {'video_url': f'https://fit-yeah.s3.amazonaws.com/{object_name}'}
