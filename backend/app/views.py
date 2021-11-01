from . import app
from app.my_api.views import user_blueprint

app.register_blueprint(user_blueprint,url_prefix='/user')
