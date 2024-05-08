# 自定义Auth - DRF认证组件

## 配置Custom Auth

```python
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed


class MyAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.query_params.get('token')
        if token:
            return 'nanguangbin', token
        raise AuthenticationFailed({'code': 2004, 'error': '认证失败'})

    def authenticate_header(self, request):
        return 'API'
```

**Custom抛出异常**
```
# User
# GET /user/
HTTP 401 Unauthorized
Allow: GET, HEAD, OPTIONS
Content-Type: application/json
Vary: Accept
WWW-Authenticate: API

{
    "code": "2004",
    "error": "认证失败"
}

```

应用
```python
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

from api import models


class ParamsAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.query_params.get('token')
        if not token:
            return
            # raise AuthenticationFailed({'code': 2004, 'error': '认证失败'})
        user_object = models.UserInfo.objects.filter(token=token).first()
        if user_object:
            return user_object, token

    def authenticate_header(self, request):
        return 'API'


class HeaderAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.META.get('HTTP_AUTHORIZATION')
        user_object = models.UserInfo.objects.filter(token=token).first()
        if token:
            return user_object, token
        return

    def authenticate_header(self, request):
        return 'API'


class NoAuthentication(BaseAuthentication):
    def authenticate(self, request):
        raise AuthenticationFailed({'code': '10004', 'msg': '认证失败'})

    def authenticate_header(self, request):
        return 'API'

```
