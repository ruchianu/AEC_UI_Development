from urllib import parse
from flask import Flask, render_template, session, request, redirect, url_for, Blueprint, flash, url_for, send_file,send_from_directory,make_response
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask import jsonify
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS, cross_origin
from datetime import datetime, timedelta
from app import app
import os
import json
from sqlalchemy import select
import string 
from app import db
from typing import Iterator, Dict, Any, Optional
from urllib.parse import urlencode
from io import BytesIO
from geopy.geocoders import Nominatim
import math
import requests
import random
from operator import attrgetter
from app.models import Lead,User,Leaduser,Leadaddress,Subscription,Addon,Order,Ordersubscription,Orderaddon,Userdevices,Deviceconfig,Professiontype,Professions,Coupons,Countries,States,Cities,RegLead,Products,Category,Subcategory,ProductAddon,AddonImages
import hashlib
import random

app.config.from_object('config')
cors = CORS(app, resources={r"/user": {"origins": "*"}})
api = Api(app)   

def Convert(lst):
    res_dct = {lst[i]: lst[i + 1] for i in range(0, len(lst), 2)}
    return res_dct

def Converts(string): 
    li = list(string.split(" ")) 
    return li 
N =2
imgSRC = "http://www.clickbulb.com/courses"

merchant_key="pV95epxu"
merchant_salt="otBf9G9Tr7"
mode=False
payUmoneyURL ='https://sandboxsecure.payu.in/_payment'

headers={'authorization': 'YOUR-AUTHORIZATION-HEADER'}



def generateOTP() :
    # Declare a string variable 
    # which stores all string
    string = '0123456789'
    OTP = ""
    length = len(string)
    for i in range(6) :
        OTP += string[math.floor(random.random() * length)]
    return OTP





user_blueprint = Blueprint('user', __name__, template_folder='templates')

def _build_cors_prelight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

def _corsify_actual_response(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response

@user_blueprint.route('/user')
def index():
    return render_template('storage.html')




# ## Getting Countries List ##
@user_blueprint.route("/country", methods=['GET', 'POST','OPTIONS'])
def country():
    if request.method == "GET":
       array_row = [] 
       q = db.session.query(Countries).all()
       for country in q:
          country_json = {"capital":country.capital,"country_id":country.id,"country_name":country.name,"iso":country.iso3,"phonecode":country.phonecode,"currency":country.currency,"currency_sign":country.currency_symbol}
          array_row.append(country_json)

       return _corsify_actual_response(jsonify(array_row)) 

## Getting States List  Via Country Code ##
@user_blueprint.route("/states", methods=['GET', 'POST'])
def state():
    if request.method == "GET":
       state = request.args.get("country_code")
       arrays_row = [] 
       q = db.session.query(States).filter(States.country_id==int(state)).order_by(States.name.asc()).all()
     
      
       for state in q:
          state_json = {"state_id" : state.id,"state_name" : state.name,"iso":state.iso2}
          arrays_row.append(state_json)

       return _corsify_actual_response(jsonify(arrays_row))

# ## Getting city List  Via state Code ##

@user_blueprint.route("/cities", methods=['GET', 'POST'])
def cities():
    if request.method == "GET":
       state = request.args.get("state_code")
       arrays_row = [] 
      
       q = db.session.query(Cities).filter(Cities.state_id==int(state)).order_by(Cities.name.asc()).all()
    
      
       for state in q:
          state_json = {"city_id" : state.id,"city_name" : state.name}
          arrays_row.append(state_json)

       return _corsify_actual_response(jsonify(arrays_row))  




## Add Send Phone OTP e##
@user_blueprint.route("/addPhoneOTP", methods=['GET', 'POST','OPTIONS'])
def addPhoneOTP():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    elif request.method == "POST":
        content = request.json
        x = datetime.now()
        phoneOTP = random.randrange(1, 10**6)
        last_item =  db.session.query(RegLead).filter(RegLead.phone==content['phone']).all() 
        if len(last_item) > 0 :
           for last_item in last_item:
            if last_item.lock_status == 2 :
               category_array = {"status":"lead exists with this phonenumber","statusCode":401}
               return _corsify_actual_response(jsonify(category_array))
            elif last_item.lock_status == 1:
               difference = x - last_item.locked_date  
               if(difference.total_seconds() < 120):
                 category_array = {"status":"lead is locked","statusCode":402}
                 return _corsify_actual_response(jsonify(category_array))
               else :
                 db.session.query(RegLead).filter(RegLead.phone==content['phone']).update({RegLead.reg_otp:str(phoneOTP),RegLead.tries:0,RegLead.lock_status:0},synchronize_session = False)
                 db.session.commit()
                 category_array = {"status":"lead update sucessfully","phone_otp":str(phoneOTP),"statusCode":200}
                 return _corsify_actual_response(jsonify(category_array))

            else :
                db.session.query(RegLead).filter(RegLead.phone==content['phone']).update({RegLead.lock_status:0,RegLead.reg_otp:str(phoneOTP),RegLead.tries:0},synchronize_session = False)
                db.session.commit()
                category_array = {"status":"lead added sucessfully","phone_otp":str(phoneOTP),"statusCode":201}
                return _corsify_actual_response(jsonify(category_array))
        else:
            Users = RegLead(
                            phone=content['phone'],
                            reg_otp=str(phoneOTP),
                            created_at=x,
                            updated_at=x)
            db.session.add(Users)
            db.session.commit()
            category_array = {"status":"lead added sucessfully","phone_otp":str(phoneOTP),"statusCode":200}
            return _corsify_actual_response(jsonify(category_array))
    else :
         raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))



@user_blueprint.route("/updatePhoneLock", methods=['GET', 'POST','OPTIONS'])
def updatePhoneLock():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    elif request.method == "POST":
        content = request.json
        x = datetime.now()
        last_item =  db.session.query(RegLead).filter(RegLead.phone==content['phone']).all() 
        if len(last_item) > 0 :
             db.session.query(RegLead).filter(RegLead.phone==content['phone']).update({RegLead.lock_status:1,RegLead.locked_date:x},synchronize_session = False)
             db.session.commit()
             category_array = {"status":"lead phone locked","statusCode":200}
             return _corsify_actual_response(jsonify(category_array))
        else:
            category_array = {"status":"lead phone not found","statusCode":401}
            return _corsify_actual_response(jsonify(category_array))
    else :
         raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))



@user_blueprint.route("/updatePhoneunLock", methods=['GET', 'POST','OPTIONS'])
def updatePhoneunLock():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    elif request.method == "POST":
        content = request.json
        x = datetime.now()
        last_item =  db.session.query(RegLead).filter(RegLead.phone==content['phone']).all() 
        if len(last_item) > 0 :
             db.session.query(RegLead).filter(RegLead.phone==content['phone']).update({RegLead.lock_status:0},synchronize_session = False)
             db.session.commit()
             category_array = {"status":"lead phone locked","statusCode":200}
             return _corsify_actual_response(jsonify(category_array))
        else:
            category_array = {"status":"lead phone not found","statusCode":401}
            return _corsify_actual_response(jsonify(category_array))
    else :
         raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))




## Generate OTP Info Start ##
@user_blueprint.route("/verifyphoneOTP", methods=['GET', 'POST','OPTIONS'])
def verifyphoneOTP():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    elif request.method == "POST":
        content = request.json
        phone = content['phone']
        otp= content['otp']
        last_item =  db.session.query(RegLead).filter(RegLead.phone==phone).all() 
        
        if len(last_item) > 0 :
          for user in last_item: 
             if(user.id > 0):
                reg_potp_tries = user.tries + 1
                if(otp == str(user.reg_otp)):
                    db.session.query(RegLead).filter(RegLead.phone==phone).update({RegLead.lock_status:0,RegLead.tries:0},synchronize_session = False)
                    db.session.commit()
                    user_array = {"status":"Phone OTP verified","status_code":200}
                    return _corsify_actual_response(jsonify(user_array))
                else :
                    db.session.query(RegLead).filter(RegLead.phone==phone).update({RegLead.tries:reg_potp_tries},synchronize_session = False)
                    db.session.commit()
                    user_array = {"status":"OTP Invalid","otp_try":reg_potp_tries,"status_code":401}
                    return _corsify_actual_response(jsonify(user_array))
    else :
       raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))


## Resend Phone OTP##
@user_blueprint.route("/resendPhoneOtp", methods=['GET', 'POST','OPTIONS'])
def resendPhoneOtp():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    elif request.method == "POST":
        content = request.json
        phone = content['phone']
        last_item =  db.session.query(RegLead).filter(RegLead.phone==phone).all() 
        if len(last_item) > 0 :
          for user in last_item: 
             if(user.id > 0):
                 phoneOTP = random.randrange(1, 10**6)
                 db.session.query(RegLead).filter(RegLead.phone==phone).update({RegLead.reg_otp:str(phoneOTP),RegLead.tries:0},synchronize_session = False)
                 db.session.commit()
                 otp_array = {"phone_otp":str(phoneOTP),"status_code":200}
                 return _corsify_actual_response(jsonify(otp_array))
             else :
                return 0  
        else :
            return 0
    else :
         raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))











@user_blueprint.route("/addEmailOTP", methods=['GET', 'POST','OPTIONS'])
def addEmailOTP():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    elif request.method == "POST":
        content = request.json
        x = datetime.now()
        emailOTP=generateOTP()
        last_item =  db.session.query(Lead).filter(Lead.phone==content['phone']).all() 
        if len(last_item) > 0 :
           db.session.query(Lead).filter(Lead.phone==content['phone']).update({Lead.email:content['email'],Lead.email_otp:emailOTP},synchronize_session = False)
           db.session.commit()
           otp_array = {"email_otp":emailOTP}
           return _corsify_actual_response(jsonify(otp_array))
    else :
         raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))



## Add User Start ##
@user_blueprint.route("/addLead", methods=['GET', 'POST','OPTIONS'])
def addLead():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    elif request.method == "POST":
        content = request.json
        x = datetime.now()
        phoneOTP = generateOTP()
        emailOTP=generateOTP()
        last_item =  db.session.query(Lead).filter(Lead.phone==content['phone']).all() 
        if len(last_item) > 0 :
            category_array = {"status":"lead exists with this phonenumber","statusCode":401}
            return _corsify_actual_response(jsonify(category_array))
        else:
            Users = Lead(name=content['name'],
                                email=content['email'],
                                phone=content['phone'],
                                refferal_code=content['refferal_code'],
                                dob=content['dob'],
                                status=1,
                                gender=content['gender'],
                                phone_otp=phoneOTP,
                                email_otp= emailOTP,
                                created_at=x,
                                updated_at=x)
            db.session.add(Users)
            db.session.commit()
            category_array = {"status":"lead added sucessfully","phone_otp":phoneOTP,"email_otp":emailOTP,"statusCode":200}
            return _corsify_actual_response(jsonify(category_array))
    else :
         raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))




## Add User Start ##
@user_blueprint.route("/updateLead", methods=['GET', 'POST','OPTIONS'])
def updateLead():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    elif request.method == "POST":
        content = request.json
        x = datetime.now()
    
        Users = Lead(name=content['name'],
                                email=content['email'],
                                phone=content['phone'],
                                refferal_code=content['refferal_code'],
                                dob=content['dob'],
                                status=1,
                                gender=content['gender'],
                                created_at=x,
                                updated_at=x)
        db.session.add(Users)
        db.session.query(RegLead).filter(RegLead.phone==content['phone']).update({RegLead.lock_status:2},synchronize_session = False)
        db.session.commit()
        last_item =  db.session.query(Lead).filter(Lead.phone==content['phone']).all() 
        if len(last_item) > 0 :
         for user in last_item: 
           leadid = user.id
           if(len(content['address'])>0):
              
                  for addresss in content['address']: 
                     Users = Leadaddress(lead_id=leadid,
                                                address_1=addresss['address_1'],
                                                address_2=addresss['address_2'],
                                                city=addresss['city'],
                                                state=addresss['state'],
                                                country=addresss['country'],
                                                zipcode=addresss['zipcode'],
                                                addressType=addresss['addressType'],
                                                status=1,
                                                created_at=x,
                                                updated_at=x)
                     db.session.add(Users)
                     db.session.commit()


           if(len(content['profession'])>0):
                for Professionss in content['profession']: 
                      prof = Professions(lead_id=leadid,
                                            profession_id=Professionss['profession_id'],
                                            name=Professionss['name'],
                                            address=Professionss['address'],
                                            city=int(Professionss['city']),
                                            state=int(Professionss['state']),
                                            country=int(Professionss['country']),
                                            ccname=Professionss['ccname'],
                                            ccphone=Professionss['ccphone'],
                                            zipcode=Professionss['zipcode'],
                                            grade=Professionss['grade'],
                                            website=Professionss['website'],
                                            working_email=Professionss['working_email'],
                                            phonenumber=Professionss['phonenumber'],
                                            department=Professionss['department'],
                                            created_at=x,
                                            updated_at=x)
                      db.session.add(prof)
                      db.session.commit()



                category_array = {"status":"lead updated successfully","statusCode":200}
                return _corsify_actual_response(jsonify(category_array))
        else:
            category_array = {"status":"lead is not found","statusCode":401}
            return _corsify_actual_response(jsonify(category_array))
    else :
       raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))


# Resend email OTP #

@user_blueprint.route("/resendEmailOtp", methods=['GET', 'POST','OPTIONS'])
def resendEmailOtp():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    elif request.method == "POST":
        content = request.json
        email = content['email']
        last_item =  db.session.query(Lead).filter(Lead.email==email).all() 
        if len(last_item) > 0 :
          for user in last_item: 
             if(user.id > 0):
                 phoneOTP = random.randrange(1, 10**6)
                 db.session.query(Lead).filter(Lead.email==email).update({Lead.email_otp:phoneOTP},synchronize_session = False)
                 db.session.commit()
                 otp_array = {"email_otp":phoneOTP}
                 return _corsify_actual_response(jsonify(otp_array))
             else :
                return 0  
        else :
            return 0
    else :
         raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))



# ## Resend Phone OTP##
# @user_blueprint.route("/resendPhoneOtp", methods=['GET', 'POST','OPTIONS'])
# def resendPhoneOtp():
#     if request.method == "OPTIONS":
#         return _build_cors_prelight_response()
#     elif request.method == "POST":
#         content = request.json
#         phone = content['phone']
#         last_item =  db.session.query(Lead).filter(Lead.phone==phone).all() 
#         if len(last_item) > 0 :
#           for user in last_item: 
#              if(user.id > 0):
#                  phoneOTP = random.randrange(1, 10**6)
#                  db.session.query(Lead).filter(Lead.phone==phone).update({Lead.phone_otp:phoneOTP,Lead.reg_potp_tries:0},synchronize_session = False)
#                  db.session.commit()
#                  otp_array = {"phone_otp":phoneOTP}
#                  return _corsify_actual_response(jsonify(otp_array))
#              else :
#                 return 0  
#         else :
#             return 0
#     else :
#          raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))





## Verify Email OTP ##
@user_blueprint.route("/verifyemailOTP", methods=['GET', 'POST','OPTIONS'])
def verifyemailOTP():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    elif request.method == "POST":
        content = request.json
        email = content['email']
        otp= content['otp']
        last_item =  db.session.query(Lead).filter(Lead.email==email).all() 
        if len(last_item) > 0 :
          for user in last_item: 
             if(user.id > 0):
                if(otp == user.email_otp):
                    db.session.query(Lead).filter(Lead.email==email).update({Lead.email_verify:1},synchronize_session = False)
                    db.session.commit()
                    user_array = {"name":user.name,"email":user.email,"phone":user.phone,"user_id":user.id,"status":"Email OTP verified","status_code":200}
                    return _corsify_actual_response(jsonify(user_array))
                else :
                    user_array = {"status":"OTP Invalid","status_code":401}
                    return _corsify_actual_response(jsonify(user_array))
    else :
       raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))

## Add Address of Lead ##

@user_blueprint.route("/addLeadAddress", methods=['GET', 'POST'])
def addLeadAddress():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    elif request.method == "POST":
        content = request.json
        x = datetime.now()
        Users = Leadaddress(lead_id=content['lead_id'],
                            address_1=content['address_1'],
                            address_2=content['address_2'],
                            city=content['city'],
                            state=content['state'],
                            country=content['country'],
                            zipcode=content['zipcode'],
                            addressType=content['addressType'],
                            status=1,
                            created_at=x,
                            updated_at=x)
        db.session.add(Users)
        db.session.commit()
        category_array = {"status":"lead address sucessfully addded"}
        return _corsify_actual_response(jsonify(category_array))
        
    else :
         raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))




@user_blueprint.route("/updateLeadAddress", methods=['GET', 'POST'])
def updateLeadAddress():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    elif request.method == "POST":
        content = request.json
        x = datetime.now()
        leadid = content['lead_id']
        db.session.query(Leadaddress).filter(Leadaddress.lead_id==leadid).update({Leadaddress.address_1:content['address_1'],
                                                                                                Leadaddress.address_2:content['address_2'],
                                                                                                Leadaddress.city:content['city'],
                                                                                                Leadaddress.state:content['state'],
                                                                                                Leadaddress.country:content['country'],
                                                                                                Leadaddress.zipcode:content['zipcode'],
                                                                                                Leadaddress.addressType:content['addressType'],
                                                                                                Leadaddress.status:1,
                                                                                                Leadaddress.updated_at:x},synchronize_session = False)
        db.session.commit()
        category_array = {"status":"lead address sucessfully updated"}
        return _corsify_actual_response(jsonify(category_array))
    else :
         raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))


## Get Profession Type ##

@user_blueprint.route("/getprofessionType", methods=['GET', 'POST','OPTIONS'])
def getCategory():
    category_array = []
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    elif request.method == "GET":
        p = db.session.query(Professiontype).all()
        if len(p) > 0:
           for category in p:
               categiory_json = {"id":category.id,"name":category.name,"desc":"","status":category.status,"created_at":category.created_at,"updated_at":category.updated_at}
               category_array.append(categiory_json)
               if len(p) == len(category_array):
                  category_json = {"professionTypes":category_array}
                  return _corsify_actual_response(jsonify(category_json))

        else :
            category_json = {"professionTypes":[]}
            return _corsify_actual_response(jsonify(category_json))
                      
    else :
         raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))



## Add profession ##

@user_blueprint.route("/addLeadprofession", methods=['GET', 'POST'])
def addLeadprofession():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    elif request.method == "POST":
        content = request.json
        x = datetime.now()
        Users = Professions(lead_id=content['lead_id'],
                            profession_id=content['profession_id'],
                            name=content['name'],
                            address=content['address'],
                            grade=content['grade'],
                            website=content['website'],
                            working_email=content['working_email'],
                            phonenumber=content['phonenumber'],
                            department=content['department'],
                            created_at=x,
                            updated_at=x)
        db.session.add(Users)
        db.session.commit()
        category_array = {"status":"lead professional sucessfully addded"}
        return _corsify_actual_response(jsonify(category_array))
        
    else :
         raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))





## updated professsion ##

@user_blueprint.route("/updateLeadprofession", methods=['GET', 'POST'])
def updateLeadprofession():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    elif request.method == "POST":
        content = request.json
        x = datetime.now()
        db.session.query(Professions).filter(Professions.lead_id==content['lead_id']).update({Professions.profession_id:content['profession_id'],
                                                                                                Professions.name:content['name'],
                                                                                                Professions.address:content['address'],
                                                                                                Professions.grade:content['grade'],
                                                                                                Professions.website:content['website'],
                                                                                                Professions.working_email:content['working_email'],
                                                                                                Professions.phonenumber:content['phonenumber'],
                                                                                                Professions.department:content['department'],
                                                                                                Professions.updated_at:x},synchronize_session = False)
        db.session.commit()
        category_array = {"status":"lead address sucessfully addded"}
        return _corsify_actual_response(jsonify(category_array))
        
    else :
         raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))


## GET Coupons##

@user_blueprint.route("/getCoupons", methods=['GET', 'POST','OPTIONS'])
def getCoupons():
    category_array = []
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    elif request.method == "GET":
        p = db.session.query(Coupons).all()
        if len(p) > 0:
            for category in p:
                categiory_json = {"id":category.id,"name":category.name,"percentage":category.percentage,"status":category.status,"created_at":category.created_at,"updated_at":category.updated_at}
                category_array.append(categiory_json)
                if len(p) == len(category_array):
                    category_json = {"coupons":category_array}
                    return _corsify_actual_response(jsonify(category_json))
        else :
            category_json = {"coupons":[]}
            return _corsify_actual_response(jsonify(category_json))

                        
    else :
         raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))


## GET Coupons Via Code##

@user_blueprint.route("/getCouponsinfo", methods=['GET', 'POST','OPTIONS'])
def getCouponsinfo():
    category_array = []
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    elif request.method == "GET":
        coupon_name = request.args.get('coupon_name')
        p = db.session.query(Coupons).filter(Coupons.name==coupon_name).all()
        if len(p) > 0:
            for category in p:
                categiory_json = {"id":category.id,"name":category.name,"percentage":category.percentage,"status":category.status,"created_at":category.created_at,"updated_at":category.updated_at}
                category_array.append(categiory_json)
                if len(p) == len(category_array):
                    category_json = {"coupons_info":category_array}
                    return _corsify_actual_response(jsonify(category_json))
        else :
                category_json = {"coupons_info":[]}
                return _corsify_actual_response(jsonify(category_json))
                      
    else :
         raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))





## Update Employee Info Start ##
# @user_blueprint.route("/updateuser", methods=['GET', 'POST'])
# def update_user():
#     if request.method == "POST":
#         content = request.json
#         x = datetime.now()
#         x = datetime.strftime(x, '%d-%m-%Y %I:%M:%S')
#         Users = Lead(name=content['name'],
#                             email=content['email'],
#                             phone=content['phone'],
#                             userType=content['userType'],
#                             status=content['status'],
#                             created_at=x,
#                             updated_at=x)
#         db.session.add(Users)
#         db.session.commit()
#         return "User updated Successfully"



## Employee Details Info Start ##
@user_blueprint.route("/detailuser", methods=['GET', 'POST'])
def detail_user():
    if request.method == "POST":
        content = request.json
        x = datetime.now()
        x = datetime.strftime(x, '%d-%m-%Y %I:%M:%S')
        Users = User(name=content['name'],
                            email=content['email'],
                            phone=content['phone'],
                            userType=content['userType'],
                            status=content['status'],
                            created_at=x,
                            updated_at=x)
        db.session.add(Users)
        db.session.commit()
        return "User updated Successfully"




## Generate OTP Info Start ##
@user_blueprint.route("/userlogin", methods=['GET', 'POST','OPTIONS'])
def user_login():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    elif request.method == "POST":
        content = request.json
        x = datetime.now()
        phone = content['phone']
  
        last_item =  db.session.query(Lead).filter(Lead.phone==phone).all() 
        if len(last_item) > 0 :
          for user in last_item: 
             phoneOTP = random.randrange(1, 10**6)
             if user.id > 0:
               if user.lock_status == 0:
                    db.session.query(Lead).filter(Lead.phone==phone).update({Lead.login_otp:str(phoneOTP)},synchronize_session = False)
                    db.session.commit()
                    otp_array = {"otp":str(phoneOTP),"statusCode":200}
                    return _corsify_actual_response(jsonify(otp_array))
               elif user.lock_status == 1:
                    difference = x - user.locked_date  
                    if(difference.total_seconds() < 120):
                        category_array = {"status":"lead is locked","statusCode":402}
                        return _corsify_actual_response(jsonify(category_array))
                    else :
                      db.session.query(Lead).filter(Lead.phone==content['phone']).update({Lead.login_otp:str(phoneOTP),Lead.tries:0,Lead.lock_status:0},synchronize_session = False)
                      db.session.commit()
                      category_array = {"status":"lead update sucessfully","phone_otp":str(phoneOTP),"statusCode":201}
                      return _corsify_actual_response(jsonify(category_array))
               else :
                    otp_array = {"otp":"","statusCode":401,"status":"user is not found with phone number"}
                    return _corsify_actual_response(jsonify(otp_array)) 
        else :
              otp_array = {"otp":"","statusCode":401,"status":"user is not found with phone number"}
              return _corsify_actual_response(jsonify(otp_array)) 
    else :
         raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))



@user_blueprint.route("/updatePhoneLoginLock", methods=['GET', 'POST','OPTIONS'])
def updatePhoneLoginLock():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    elif request.method == "POST":
        content = request.json
        x = datetime.now()
        last_item =  db.session.query(Lead).filter(Lead.phone==content['phone']).all() 
        if len(last_item) > 0 :
             db.session.query(Lead).filter(Lead.phone==content['phone']).update({Lead.lock_status:1,Lead.locked_date:x},synchronize_session = False)
             db.session.commit()
             category_array = {"status":"lead phone locked","statusCode":200}
             return _corsify_actual_response(jsonify(category_array))
        else:
            category_array = {"status":"lead phone not found","statusCode":401}
            return _corsify_actual_response(jsonify(category_array))
    else :
         raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))



## Generate OTP Info Start ##
@user_blueprint.route("/verifyloginphoneOTP", methods=['GET', 'POST','OPTIONS'])
def verifyloginphoneOTP():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    elif request.method == "POST":
        content = request.json
        phone = content['phone']
        otp= content['otp']
        last_item =  db.session.query(Lead).filter(Lead.phone==phone).all() 
        if len(last_item) > 0 :
          for user in last_item: 
             if(user.id > 0):
                reg_potp_tries = user.tries + 1
                if(otp == str(user.login_otp)):
                    db.session.query(Lead).filter(Lead.phone==phone).update({Lead.lock_status:0,Lead.tries:0},synchronize_session = False)
                    db.session.commit()
                    user_array = {"status":"Phone OTP verified","status_code":200}
                    return _corsify_actual_response(jsonify(user_array))
                else :
                    db.session.query(Lead).filter(Lead.phone==phone).update({Lead.tries:reg_potp_tries},synchronize_session = False)
                    db.session.commit()
                    user_array = {"status":"Invalid OTP","otp_try":reg_potp_tries,"status_code":401}
                    return _corsify_actual_response(jsonify(user_array))
    else :
       raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))


## Resend Phone OTP##
@user_blueprint.route("/resendloginPhoneOtp", methods=['GET', 'POST','OPTIONS'])
def resendloginPhoneOtp():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    elif request.method == "POST":
        content = request.json
        phone = content['phone']
        last_item =  db.session.query(Lead).filter(Lead.phone==phone).all() 
        if len(last_item) > 0 :
          for user in last_item: 
             if(user.id > 0):
                 phoneOTP = random.randrange(1, 10**6)
                 db.session.query(Lead).filter(Lead.phone==phone).update({Lead.login_otp:str(phoneOTP),Lead.tries:0},synchronize_session = False)
                 db.session.commit()
                 otp_array = {"phone_otp":str(phoneOTP),"status_code":200}
                 return _corsify_actual_response(jsonify(otp_array))
             else :
                return 0  
        else :
            return 0
    else :
         raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))









## Generate OTP Info Start ##
@user_blueprint.route("/verifyuserOTP", methods=['GET', 'POST','OPTIONS'])
def verifyuserOTP():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    elif request.method == "POST":
        content = request.json
        phone = content['phone']
        userType = content['userType']
        otp= content['otp']
        last_item =  db.session.query(Lead).filter(Lead.phone==phone).all() 
        
        if len(last_item) > 0 :
          for user in last_item: 
             if(user.id > 0):
                if(otp == user.phone_otp):
                    userInfo = {"name":user.name,"email":user.email,"phone":user.phone,"userId":user.id}
                    user_array = {"status":"Phone OTP verified","userInfo":userInfo,"status_code":200}
                    return _corsify_actual_response(jsonify(user_array))
                else :
                    user_array = {"status":"Phone OTP is not verified","status_code":402}
                    return _corsify_actual_response(jsonify(user_array))
        else :
            user_array = {}
            return _corsify_actual_response(jsonify(user_array))            
    else :
       raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))


## Generate OTP Info Start ##

# @user_blueprint.route("/userlogin", methods=['GET', 'POST','OPTIONS'])
# def user_login():
#     if request.method == "OPTIONS":
#         return _build_cors_prelight_response()
#     elif request.method == "POST":
#         content = request.json
#         phone = content['phone']
#         userType = content['userType']
#         last_item =  db.session.query(Lead).filter(Lead.phone==phone).all() 
#         if len(last_item) > 0 :
#           for user in last_item: 
#              if(user.id > 0):
#                  phoneOTP = random.randrange(1, 10**6)
#                  db.session.query(Lead).filter(Lead.phone==phone).update({Lead.phone_otp:phoneOTP},synchronize_session = False)
#                  db.session.commit()
#                  otp_array = {"otp":phoneOTP,"status_code":200}
#                  return _corsify_actual_response(jsonify(otp_array))
#              else :
#                 otp_array = {"otp":"","status_code":402,"status":"user is not found with phone number"}
#                 return _corsify_actual_response(jsonify(otp_array)) 
#         else :
#               otp_array = {"otp":"","status_code":402,"status":"user is not found with phone number"}
#               return _corsify_actual_response(jsonify(otp_array)) 
#     else :
#          raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))




# @user_blueprint.route("/resenduserOTP", methods=['GET', 'POST','OPTIONS'])
# def resenduserOTP():
#     if request.method == "POST":
#         content = request.json
#         phone = content['phone']
#         userType = content['userType']
#         last_item =  db.session.query(Lead).filter(Lead.phone==phone).all() 
#         if len(last_item) > 0 :
#           for user in last_item: 
#              if(user.id > 0):
#                  phoneOTP = random.randrange(1, 10**6)
#                  db.session.query(Lead).filter(Lead.phone==phone).update({Lead.phone_otp:phoneOTP},synchronize_session = False)
#                  db.session.commit()
#                  user_array = {"otp":phoneOTP,"status_code":200}
#                  return _corsify_actual_response(jsonify(user_array))
#              else :
#                  user_array = {"otp":"","status":"user is not found","status_code":401}
#                  return _corsify_actual_response(jsonify(user_array)) 
#         else :
#             user_array = {"otp":"","status":"user is not found","status_code":401}
#             return _corsify_actual_response(jsonify(user_array)) 


## Get subscriptions Start ##
@user_blueprint.route("/getSubscriptions", methods=['GET', 'POST'])
def getSubscriptions():
    if request.method == "GET":
        content = request.json
        subscriptions = []
        last_item =  db.session.query(Subscription).all() 
        if len(last_item) > 0 :
          for subscriptiosn in last_item: 
              categiory_json = {"id":subscriptiosn.id,"name":subscriptiosn.name,"noofmonths":subscriptiosn.no_of_months,"no_of_books":subscriptiosn.no_of_books,"no_of_learners":subscriptiosn.no_of_learners,"no_of_devices":subscriptiosn.no_of_devices,"prices":subscriptiosn.prices,"description":subscriptiosn.description}
              subscriptions.append(categiory_json)
              if len(last_item) == len(subscriptions):
                    category_json = {"subscriptions":subscriptions}
                    return _corsify_actual_response(jsonify(category_json))
        else :
            user_array = {"subscriptions":subscriptions}
            return _corsify_actual_response(jsonify(user_array)) 
      

## Add Order Start ##
@user_blueprint.route("/addOrder", methods=['GET', 'POST'])
def addOrder():
    if request.method == "POST":
        content = request.json
        x = datetime.now()
        if ['order_id'] == 0:
            last_item =  db.session.query(Lead).filter(Lead.id==content['lead_id']).all() 
            if len(last_item) > 0 :
               for leaddata in last_item:
                    Users = User(name=leaddata.name,
                            email=leaddata.email,
                            phone=leaddata.phone,
                            dob=leaddata.dob,
                            status=1,
                            created_at=x,
                            updated_at=x)
                    db.session.add(Users)
                    db.session.commit()
            last_user = db.session.query(User).filter(User.phone==leaddata.phone).all() 
            if len(last_user) > 0 :
               for userdata in last_user:
                   userid = userdata.id
                   leadid = content['lead_id']
                   orders = Order(lead_id=leadid,
                            user_id=userid,
                            total=content['price'],
                            status=1,
                            created_at=x,
                            updated_at=x)
                   db.session.add(orders)
                   db.session.commit()
                   last_order = db.session.query(Order).filter(Order.lead_id==leadid).all() 
                   if len(last_order) > 0 :
                    for orderdata in last_order:
                        order_id = orderdata.id 
                        subwscription_orders = Ordersubscription(lead_id=leadid,
                            user_id=userid,
                            order_id=order_id,
                            subscription_id=content['subscription_id'],
                            created_at=x,
                            updated_at=x)
                        db.session.add(subwscription_orders)
                        db.session.commit() 
                        category_json = {"status":"order added sucessfully"}
                        return _corsify_actual_response(jsonify(category_json))          
        else :
            orders = Order(lead_id=content['lead_id'],
                            user_id=content['user_id'],
                            total=content['price'],
                            status=1,
                            created_at=x,
                            updated_at=x)
            db.session.add(orders)
            db.session.commit()
            last_order = db.session.query(Order).filter(Order.lead_id==content['lead_id']).all() 
            if len(last_order) > 0 :
               for orderdata in last_order:
                        order_id = orderdata.id 
                        subwscription_orders = Ordersubscription(lead_id=content['lead_id'],
                            user_id=content['user_id'],
                            order_id=order_id,
                            subscription_id=content['subscription_id'],
                           
                            created_at=x,
                            updated_at=x)
                        db.session.add(subwscription_orders)
                        db.session.commit()
                        category_json = {"status":"order added sucessfully"}
                        return _corsify_actual_response(jsonify(category_json))         



## Add device Start ##
@user_blueprint.route("/addDevice", methods=['GET', 'POST'])
def addDevice():
    if request.method == "POST":
        content = request.json
        x = datetime.now()
        Userdevicess = Userdevices(user_id=content['user_id'],
                                   device_name=content['device_name'],
                                   deviceType=content['device_type'],
                                   priority=content['priority'],
                                   status=1,
                                   created_at=x,
                                   updated_at=x)
        db.session.add(Userdevicess)
        db.session.commit() 
        last_device = db.session.query(Userdevices).filter(Userdevices.user_id==content['user_id']).filter(Userdevices.priority==content['priority']).all() 
        if len(last_device) > 0 :
           for devicedata in last_device:
               device_id = devicedata.id 
               if content['device_type'] == 1:
                  otp = random.randrange(1, 10**6) 
                  Userdevicess = Deviceconfig(user_id=content['user_id'],
                                   user_device_id=device_id,
                                   mac_address=content['mac_address'],
                                   deviceType=content['device_type'],
                                   email=content['email'],
                                   email_otp=otp,
                                   created_at=x,
                                   updated_at=x)
                  db.session.add(Userdevicess)
                  db.session.commit() 
                  category_json = {"status":"device added sucessfully","email_otp":otp}
                  return _corsify_actual_response(jsonify(category_json))
               else :
                  otp = random.randrange(1, 10**6) 
                  Userdevicess = Deviceconfig(user_id=content['user_id'],
                                   user_device_id=device_id,
                                   mac_address=content['mac_address'],
                                   deviceType=content['device_type'],
                                   phone=content['phone'],
                                   phone_otp=otp,
                                   created_at=x,
                                   updated_at=x)
                  db.session.add(Userdevicess)
                  db.session.commit() 
                  category_json = {"status":"device added sucessfully","phone_otp":otp}
                  return _corsify_actual_response(jsonify(category_json))





  ## Get subscriptions Start ##
@user_blueprint.route("/getProduct", methods=['GET', 'POST'])
def getProduct():
    if request.method == "GET":
        state = request.args.get("productid")
        priority=request.args.get("priority")
        images=[]
        last_item =  db.session.query(ProductAddon).filter(ProductAddon.product_id==state).filter(ProductAddon.priority==priority).all() 
        if len(last_item) > 0 :
           products=last_item[0]
           productInfo = {}
           last_images =  db.session.query(AddonImages).filter(AddonImages.product_id==state).filter(AddonImages.addon_id==priority).all() 
           if len(last_images) > 0:
               for last_imagess in last_images:
                   imagesJSON = {"image":imgSRC + last_imagess.path,"thumbImage":imgSRC + last_imagess.path,"alt":"","title":"","order":last_imagess.priority}
                   images.append(imagesJSON)
                   if len(images) == len(last_images):
                      category_json = {"quantity":1,"pid":products.id,"description":products.pro_desc,"details":products.product_details,"price": products.price,"mrp":products.mrp,"name":products.pro_name,"product_id":state,"main_image":imgSRC+ products.image,"images":images}
                      return _corsify_actual_response(jsonify(category_json))
                    
           else :
               category_json = {"quantity":1,"pid":products.id,"description":products.pro_desc,"details":products.product_details,"price": products.price,"mrp":products.mrp,"name":products.pro_name,"product_id":state,"main_image":imgSRC + products.image,"images":[]}
               return _corsify_actual_response(jsonify(category_json))
        else :
            user_array = {}
            return _corsify_actual_response(jsonify(user_array)) 
    else :
      raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))


@user_blueprint.route("/getAddon", methods=['GET', 'POST'])
def getAddon():
    if request.method == "GET":
        state = request.args.get("productid")
        addon = []
        last_item =  db.session.query(ProductAddon).filter(ProductAddon.product_id==state).all() 
        print(last_item)
        if len(last_item) > 0 :
          for last_Item in last_item:
           productInfo = {"name":last_Item.name,"pid":last_Item.id,"priority":last_Item.priority}
           addon.append(productInfo)
           if len(addon) == len(last_item):
             return _corsify_actual_response(jsonify(addon))
        else :
            user_array = {}
            return _corsify_actual_response(jsonify(user_array)) 
    else :
      raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))
      

      

@user_blueprint.route("/getProducts", methods=['GET', 'POST'])
def getProducts():
    if request.method == "GET":
        products=[]
        last_item =  db.session.query(ProductAddon).all() 
        if len(last_item) > 0 :
           for product in last_item:
            category_json = {"quantity":1,"pid":product.id,"description":product.pro_desc,"details":product.product_details,"price": product.price,"mrp":product.mrp,"name":product.pro_name,"main_image":imgSRC + product.image}
            products.append(category_json)
            if len(products) == len(last_item):
                user_array = {"status":200,"productsInfo":products}
                return _corsify_actual_response(jsonify(user_array))
        else :
            user_array = {}
            return _corsify_actual_response(jsonify(user_array)) 
    else :
        raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))



## Add device Start ##
@user_blueprint.route("/pay", methods=['GET','POST','OPTIONS'])
def pay():
    if request.method == "OPTIONS":
        return _build_cors_prelight_response()
    elif request.method == "POST":
        content = request.json
        try:
          amount = str(int(content['amount']))
        except:
          amount = str("{0:.2f}".format(float(content['amount'])))
        
        firstname = content['firstname']
        lastname = content['lastname']
        email = content['email']
        content['productinfo'] = 'donation'
        phone = content['phone']
        # Payer Address
        # address1 = content['address1']
        # city = content['city']
        # state = content['state']
        # country = content['country']
        # Redirect link for successful Payment
        surl = 'http://15.206.174.177/user/success'

        # Redirect link for Failure Payment
        furl = 'http://15.206.174.177/user/failure'
            # service_provider
        service_provider = 'payu_paisa'
        # addres
        # zipcode = content['zipcode']
        txnid=content['txnid']
        content['key']=merchant_key


        #post_hashseq = "{merchant_key}|{txnid}|{amount}|{productinfo}|{firstname}|{email}|||||||||||{merchant_salt}"
       
       	hashSequence = "key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10"
       
        hash_string=''
        hashVarsSeq=hashSequence.split('|')
        for i in hashVarsSeq:
            try:
                hash_string+=str(content[i])
            except Exception:
                hash_string+=''
            hash_string+='|'
        hash_string+=merchant_salt
       
       
       
        post_hash = hashlib.sha512(
        hash_string.encode("utf-8")).hexdigest().lower()
        res_data = {
        'firstname': firstname,
        'lastname': lastname,
        'email': email,
        'phone': int(phone),
        'amount': float(amount),
        'merchant_key': merchant_key,
        'txnid': txnid,
        'hash': post_hash,
        'productinfo': content['productinfo'],
        'surl': surl,
        'furl': furl,
        'key':merchant_key
        }
        return _corsify_actual_response(jsonify(res_data))
    else :
        raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))




@user_blueprint.route('/success', methods=['POST'])
def success():

    data = request.values.to_dict(flat=True)
    # verify response hash
    # res = verify_resp_hash(data)
    # if(type(res) != dict or res['verify'] == 'fail'):
    #     return render_template('error.html', msg='Transaction Verification Failed')

    # change_status(data['txnid'], data['status'], ref_id=data['mihpayid'])

    return redirect('')


@user_blueprint.route('/failure', methods=['POST'])
def failure():
    data = request.values.to_dict(flat=True)
    # verify response hash

    # res = verify_resp_hash(data)
    # if(type(res) != dict or res['verify'] == 'fail'):
    #     return render_template('error.html', msg='Transaction Verification Failed')

    # change_status(data['txnid'], data['status'], data['mihpayid'])

    return redirect('')


