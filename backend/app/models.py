from app import db
from sqlalchemy.ext.hybrid import hybrid_method, hybrid_property
from datetime import datetime
from . import app


class Countries(db.Model):
    __tablename__ = "countries"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=True,default=0)
    iso3 =  db.Column(db.String, nullable=True,default=0)
    iso2 =  db.Column(db.String, nullable=True,default=0)
    phonecode =  db.Column(db.String, nullable=True,default=0)
    capital =  db.Column(db.String, nullable=True,default=0)
    currency =  db.Column(db.String, nullable=True,default=0)
    currency_symbol =  db.Column(db.String, nullable=True,default=0)
    tld =  db.Column(db.String, nullable=True,default=0)
    native =  db.Column(db.String, nullable=True,default=0)
    region =  db.Column(db.String, nullable=True,default=0)
    subregion =  db.Column(db.String, nullable=True,default=0)
    timezones =  db.Column(db.String, nullable=True,default=0)
    translations =  db.Column(db.String, nullable=True,default=0)
    latitude = db.Column(db.Float, nullable=True,default=0)
    longitude =  db.Column(db.Float, nullable=True,default=0)
    emoji=db.Column(db.String, nullable=True,default=0)
    emojiU=db.Column(db.String, nullable=True,default=0)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)
    flag=db.Column(db.String, nullable=True,default=0)
    wikiDataId=db.Column(db.String, nullable=True,default=0)

# Models of States #

class States(db.Model):
    __tablename__ = "states"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=True,default=0)
    country_id =  db.Column(db.Integer, nullable=True,default=0)
    country_code =  db.Column(db.String, nullable=True,default=0)
    fips_code =  db.Column(db.String, nullable=True,default=0)
    iso2 =  db.Column(db.String, nullable=True,default=0)
    latitude =  db.Column(db.Float, nullable=True,default=0)
    longitude =  db.Column(db.Float, nullable=True,default=0)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)
    flag =  db.Column(db.Integer, nullable=True,default=0)
    wikiDataId =  db.Column(db.String, nullable=True,default=0)

# Models of cities #

class Cities(db.Model):
    __tablename__ = "cities"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=True,default=0)
    state_id =  db.Column(db.Integer, nullable=True,default=0)
    state_code =  db.Column(db.String, nullable=True,default=0)
    country_id =  db.Column(db.Integer, nullable=True,default=0)
    country_code =  db.Column(db.String, nullable=True,default=0)
    latitude =  db.Column(db.Float, nullable=True,default=0)
    longitude =  db.Column(db.Float, nullable=True,default=0)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)
    flag =  db.Column(db.Integer, nullable=True,default=0)
    wikiDataId=db.Column(db.String, nullable=True,default=0)


class RegLead(db.Model):
    __tablename__ = "reg_lead"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    phone = db.Column(db.BIGINT, nullable=False,unique=True,default=0)
    tries = db.Column(db.Integer, nullable=True,default=0)
    reg_otp = db.Column(db.String, nullable=True,default=0)
    lock_status = db.Column(db.Integer, nullable=True,default=0)
    locked_date=db.Column(db.DateTime, nullable=True)
    status = db.Column(db.Integer, nullable=False,default=0)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)


class Lead(db.Model):
    __tablename__ = "lead"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=True)
    email = db.Column(db.String, nullable=True)
    phone = db.Column(db.BIGINT, nullable=False,unique=True,default=0)
    loginType = db.Column(db.Integer, nullable=False,default=0)
    email_otp = db.Column(db.String, nullable=False,default=0)
    phone_otp = db.Column(db.String, nullable=False,default=0)
    email_verify = db.Column(db.Integer, nullable=False,default=0)
    phone_verify = db.Column(db.Integer, nullable=False,default=0)
    refferal_code = db.Column(db.String, nullable=False,default=0)
    login_otp=db.Column(db.String, nullable=True,default=0)
    login_otp_verify=db.Column(db.Integer, nullable=True,default=0)
    tries = db.Column(db.Integer, nullable=True,default=0)
    lock_status = db.Column(db.Integer, nullable=True,default=0)
    locked_date=db.Column(db.DateTime, nullable=True)
    last_login=db.Column(db.DateTime, nullable=True)
    gender=db.Column(db.Integer, nullable=False,default=0)
    dob = db.Column(db.DateTime, nullable=True)
    status = db.Column(db.Integer, nullable=False,default=0)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=True)
    email = db.Column(db.String, nullable=True)
    phone = db.Column(db.BIGINT, nullable=False,default=0)
    loginType = db.Column(db.Integer, nullable=False,default=0)
    email_otp = db.Column(db.Integer, nullable=False,default=0)
    phone_otp = db.Column(db.Integer, nullable=False,default=0)
    email_verify = db.Column(db.Integer, nullable=False,default=0)
    phone_verify = db.Column(db.Integer, nullable=False,default=0)
    dob = db.Column(db.DateTime, nullable=True)
    status = db.Column(db.Integer, nullable=False,default=0)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)
   

class Leaduser(db.Model):
    __tablename__ = "lead_user"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    lead_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)
   

class Professiontype(db.Model):
    __tablename__ = "profession_type"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name=db.Column(db.String, nullable=True)
    status=db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)


class Coupons(db.Model):
    __tablename__ = "coupons"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name=db.Column(db.String, nullable=True)
    percentage = db.Column(db.Integer, nullable=False,default=0)
    status=db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)


class Professions(db.Model):
    __tablename__ = "leaduserprofession"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    profession_id=db.Column(db.Integer, nullable=False)
    lead_id=db.Column(db.Integer, nullable=False,default=0)
    user_id=db.Column(db.Integer, nullable=False,default=0)
    name=db.Column(db.String, nullable=True)
    address=db.Column(db.String, nullable=True)
    grade=db.Column(db.String, nullable=True)
    website=db.Column(db.String, nullable=True)
    working_email=db.Column(db.String, nullable=True)
    phonenumber=db.Column(db.BIGINT, nullable=False)
    department=db.Column(db.String, nullable=True)
    city = db.Column(db.Integer, nullable=False,default=0)
    state = db.Column(db.Integer, nullable=False,default=0)
    country = db.Column(db.Integer, nullable=False,default=0)
    ccname = db.Column(db.String, nullable=False,default=0)
    ccphone = db.Column(db.BIGINT, nullable=False,default=0)
    zipcode = db.Column(db.Integer, nullable=False,default=0)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)


class Leadaddress(db.Model):
    __tablename__ = "lead_address"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    lead_id = db.Column(db.Integer, nullable=True)
    address_1 = db.Column(db.String, nullable=True)
    address_2 = db.Column(db.String, nullable=True)
    city = db.Column(db.Integer, nullable=False,default=0)
    state = db.Column(db.Integer, nullable=False,default=0)
    country = db.Column(db.Integer, nullable=False,default=0)
    zipcode = db.Column(db.Integer, nullable=False,default=0)
    addressType = db.Column(db.Integer, nullable=False,default=0)
    status = db.Column(db.Integer, nullable=False,default=0)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)


class Products(db.Model):
    __tablename__ = "product"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=True)
    cat_id=db.Column(db.Integer, nullable=False,default=0)
    sub_cat_id=db.Column(db.Integer, nullable=False,default=0)
    status = db.Column(db.Integer, nullable=False,default=0)


class Category(db.Model):
    __tablename__ = "catgory"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=True)
    slug = db.Column(db.String, nullable=True)
    status = db.Column(db.Integer, nullable=False,default=0)


class Subcategory(db.Model):
    __tablename__ = "subcategory"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=True)
    slug = db.Column(db.String, nullable=True)
    cat_id=db.Column(db.Integer, nullable=False,default=0)
    status = db.Column(db.Integer, nullable=False,default=0)


class ProductAddon(db.Model):
    __tablename__ = "productAddon"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    product_id=db.Column(db.Integer, nullable=False,default=0)
    price=db.Column(db.Float, nullable=False,default=0)
    name = db.Column(db.String, nullable=True)
    pro_name = db.Column(db.String, nullable=True)
    product_details = db.Column(db.String, nullable=True)
    pro_desc = db.Column(db.String, nullable=True)
    image = db.Column(db.String, nullable=True)
    mrp=db.Column(db.Float, nullable=False,default=0)
    priority=db.Column(db.Integer, nullable=False,default=0)
    cat_id=db.Column(db.Integer, nullable=False,default=0)
    sub_cat_id=db.Column(db.Integer, nullable=False,default=0)
    slug = db.Column(db.String, nullable=True)
    status = db.Column(db.Integer, nullable=False,default=0)

class AddonImages(db.Model):
    __tablename__ = "addonImages"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    product_id=db.Column(db.Integer, nullable=False,default=0)
    addon_id=db.Column(db.Integer, nullable=False,default=0)
    name = db.Column(db.String, nullable=True)
    path = db.Column(db.String, nullable=True)
    priority = db.Column(db.Integer, nullable=False,default=0)
    status = db.Column(db.Integer, nullable=False,default=0)


class Subscription(db.Model):
    __tablename__ = "subscription"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=True)
    no_of_months = db.Column(db.Integer, nullable=False,default=0)
    no_of_books = db.Column(db.Integer, nullable=False,default=0)
    no_of_learners = db.Column(db.Integer, nullable=False,default=0)
    no_of_devices = db.Column(db.Integer, nullable=False,default=0)
    prices = db.Column(db.Float, nullable=False,default=0)
    description = db.Column(db.String, nullable=False,default=0)
    status = db.Column(db.Integer, nullable=False,default=0)

class Addon(db.Model):
    __tablename__ = "addon"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=True)
    prices = db.Column(db.Float, nullable=False,default=0)
    description = db.Column(db.String, nullable=False,default=0)
    status = db.Column(db.Integer, nullable=False,default=0)
    
class Order(db.Model):
    __tablename__ = "order"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    lead_id = db.Column(db.Integer, nullable=False,default=0)
    user_id = db.Column(db.Integer, nullable=False,default=0)
    total = db.Column(db.Float, nullable=False,default=0)
    status = db.Column(db.Integer, nullable=False,default=0)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)


class Ordersubscription(db.Model):
    __tablename__ = "order_subscription"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    lead_id = db.Column(db.Integer, nullable=False,default=0)
    user_id = db.Column(db.Integer, nullable=False,default=0)
    order_id = db.Column(db.Integer, nullable=False,default=0)
    subscription_id = db.Column(db.Integer, nullable=False,default=0)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)

class Orderaddon(db.Model):
    __tablename__ = "order_addon"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    lead_id = db.Column(db.Integer, nullable=False,default=0)
    user_id = db.Column(db.Integer, nullable=False,default=0)
    order_id = db.Column(db.Integer, nullable=False,default=0)
    addon_id = db.Column(db.Integer, nullable=False,default=0)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)


class Userdevices(db.Model):
    __tablename__ = "user_devices"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, nullable=False,default=0)
    device_name = db.Column(db.String, nullable=True)
    deviceType = db.Column(db.Integer, nullable=True)
    priority = db.Column(db.Integer, nullable=False,default=0)
    status = db.Column(db.Integer, nullable=False,default=0)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)


class Deviceconfig(db.Model):
    __tablename__ = "device_config"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, nullable=False,default=0)
    user_device_id = db.Column(db.Integer, nullable=False,default=0)
    mac_address = db.Column(db.String, nullable=False,default=0)
    deviceType = db.Column(db.String, nullable=True)
    ieminumber = db.Column(db.String, nullable=True)
    email_otp = db.Column(db.Integer, nullable=False,default=0)
    email = db.Column(db.String, nullable=False,default=0)
    phone = db.Column(db.BIGINT, nullable=False,default=0)
    phone_otp = db.Column(db.Integer, nullable=False,default=0)
    created_at = db.Column(db.DateTime, nullable=True)
    updated_at = db.Column(db.DateTime, nullable=True)

