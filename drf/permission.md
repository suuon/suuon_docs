# 权限设置

`has_permission`为`True`有权限`False`就没有权限。

```python
# permission.py
import random

from django.contrib.auth.models import Permission


class MyPermission(Permission):
    message = {'code': 2003, 'msg': '无权访问'}

    def has_permission(self, request, view):
        v1 = random.randint(1, 3)
        if v1 == 2:
            return True
        return False
```

```python
# settings.py
# DRF配置
REST_FRAMEWORK = {
    'UNAUTHENTICATED_USER': None,
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'ext.auth.ParamsAuthentication', 'ext.auth.HeaderAuthentication', 'ext.auth.NoAuthentication'
    ],
    # 全局配置自定义权限
    'DEFAULT_PERMISSION_CLASSES': [
        'ext.permission.MyPermission',
    ]
}
```
