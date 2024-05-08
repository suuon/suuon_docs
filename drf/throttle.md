# 限流 throttle

```python
from rest_framework.throttling import BaseThrottle


class MyBaseThrottle(BaseThrottle):
    def allow_request(self, request, view):
        return True
    def get_cache_key # 连接Redis操作
```

```python
# throttle.py
from rest_framework.throttling import SimpleRateThrottle
from django.core.cache import cache as default_cache


class MyThrottle(SimpleRateThrottle):
    scope = 'xxx'
    THROTTLE_RATES = {'xxx': '5/m'}  # 一分钟访问5次
    cache = default_cache

    def get_cache_key(self, request, view):
        if request.user:
            ident = request.user.pk  # 用户ID
        else:
            ident = self.get_ident(request)  # 获取请求用户的IP（去request中找请求头）
        return self.cache_format % {'scope': self.scope, 'ident': ident}
```

## Redis配置

首先安装redis

```shell
pip install django-redis
```

其次配置`settings.py`

```python
# settings.py
# 配置文件中redis缓存的配置
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379',
        'OPTION': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            'PASSWORD': 'qwe123',
        }
    }
}
```

**应用**

```python
# views.py
class LoginView(APIView):
    authentication_classes = []
    throttle_classes = [MyThrottle, ]
```

获取，用户，IP地址

1. 获取当前时间
2. 当前时间减（-）10分钟=计数开始时间
3. 删除小于
4. 计算长度
    - 超过，错误
    - 未超，访问

### 使用
- 编写类
  1. 编写类
  2. 安装django-redis配置=>settings.py
  3. 安装django-redis
  4. 启动redis服务
- 应用
  - 可以局部应用 （一般局部应用，）权限确认之后
