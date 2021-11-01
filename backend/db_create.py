from app import db
from app.models import Lead,User,Leaduser,Leadaddress,Subscription,Addon,Order,Ordersubscription,Orderaddon,Userdevices,Deviceconfig,Professiontype,Professions,Coupons
db.drop_all()
db.create_all()
db.session.commit()
