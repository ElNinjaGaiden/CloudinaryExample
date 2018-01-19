/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    cloudinarySettings: {
        cloudName   : 'yoinbol-dgarcia',
        apiKey      : '258753397561699',
        apiSecret   : '-8HZMS-b5Arp-UOaWZrKVdaRzk4'
    },
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        //this.receivedEvent('deviceready');

        this.attachListeners();
    },

    attachListeners: function () {
        var fromCameraButton = document.getElementById('from-camera');
        var fromGalleryButton = document.getElementById('from-gallery');

        fromCameraButton && fromCameraButton.addEventListener('click', this.getPhotoFromCamera.bind(this), false);
        fromGalleryButton && fromGalleryButton.addEventListener('click', this.getPhotoFromGallery.bind(this), false);
    },

    getPhotoFromCamera: function () {
        
        if(navigator.camera) {

            var me          = this,
                isAndroid   = device.platform === 'Android',
                imageData   = '',
                options     = {
                    quality         : 100,
                    destinationType : isAndroid ? Camera.DestinationType.NATIVE_URI : Camera.DestinationType.DATA_URL,
                    sourceType      : Camera.PictureSourceType.CAMERA,
                    saveToPhotoAlbum: true
                };

            var successFunction = function (imageURL) {
                imageData = isAndroid ? imageURL : 'data:image/jpeg;base64,' + imageURL;
                me.uploadImage(imageData);
            };

            var errorFunction = function (imageURL) {
                alert('There was an error getting access to the camera');
            };

            navigator.camera.getPicture(successFunction, errorFunction, options);
        }
        else {
            alert('No access to camera');
        }
    },

    getPhotoFromGallery: function () {
        
        if(navigator.camera) {

            var me          = this,
                isAndroid   = device.platform === 'Android',
                imageData   = '',
                options     = {
                    quality         : 100,
                    destinationType : isAndroid ? Camera.DestinationType.FILE_URI : Camera.DestinationType.DATA_URL,
                    sourceType      : Camera.PictureSourceType.PHOTOLIBRARY
                };

            var successFunction = function (imageURL) {
                if(isAndroid) {
                    var isContentFile = imageURL.indexOf('content://') !== -1;
                    if(isContentFile) {
                        window.FilePath.resolveNativePath(imageURL, function (imagePath) {
                            imageData = imagePath;
                            me.uploadImage(imageData);
                        }, errorFunction);
                    }
                    else {
                        imageData = imageURL;
                        me.uploadImage(imageData);
                    }
                }
                else {
                    //iOS
                    imageData = 'data:image/jpeg;base64,' + imageURL
                    me.uploadImage(imageData);
                }
            };

            var errorFunction = function (imageURL) {
                alert('There was an error getting the picture from the gallery');
            };

            navigator.camera.getPicture(successFunction, errorFunction, options);
        }
        else {
            alert('No access to photo gallery');
        }
    },

    uploadImage: function (imageData) {
        var me 			= this,
        	request     = {
                imagePath           : imageData,
                cloudinarySettings  : me.cloudinarySettings
            };

        navigator.cloudinary.uploadImage(request, me.onImageUploaded.bind(me), me.onImageUploadedError.bind(me));
    },

    onImageUploaded: function (imageData) {
        console.log('Image uploaed', imageData);
        alert('Done!');
    },

    onImageUploadedError: function (error) {
        console.error(error);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();