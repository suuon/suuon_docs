# 版本管理

## 基本配置

```python
# settings.py
# DRF配置
REST_FRAMEWORK = {
    'UNAUTHENTICATED_USER': None,
    'VERSION_PARAM': 'version',
    'DEFAULT_VERSION': 'v1',  # 默认版本
    'ALLOWED_VERSIONS': ['v1', 'v2'],  # 只传存才的version
}
```

## 1. QueryParameterVersioning

### 实际使用

```python
# urls.py
from django.urls import path
from api import views

urlpatterns = [
    path('home/', views.HomeView.as_view(), name='home'),
]
```

```python
# views.py
class HomeView(APIView):
    # 配置文件
    # http://127.0.0.1:8000/home/?version=v1
    versioning_class = QueryParameterVersioning

    def get(self, request):
        print(request.version)
        print(request.versioning_scheme)
        print(request.versioning_scheme.reverse('home', request=request))

        return Response('...')
```

## 2. URLPathVersioning

### *实际使用 （使用最多）

```python
# urls.py
from django.urls import path
from api import views

urlpatterns = [
    path('api/<str:version>/home/', views.HomeView.as_view(), name='home'),
]

```

```python
# views.py
class HomeView(APIView):
    # 配置文件
    # http://localhost:8000/api/v1/home/
    versioning_class = URLPathVersioning

    def get(self, request, *args, **kwargs):
        print(request.version)
        print(request.versioning_scheme)、url = request.versioning_scheme.reverse('home', request=request)
        print('反向生成URL：', url)
        
        return Response('...')
```

得出结果： 反向生成URL： http://localhost:8000/api/v1/home/

## 3. AcceptHeaderVersioning

### Header 请求

```shell
headers={
  "Accept": "application/json;version=v1"
}
```

### 实际使用

```python
# urls.py
from django.urls import path
from api import views

urlpatterns = [
    path('api/home/', views.HomeView.as_view(), name='home'),
]

```

```python
# views.py
class HomeView(APIView):
    # 配置文件
    # http://localhost:8000/api/v1/home/
    versioning_class = AcceptHeaderVersioning

    def get(self, request, *args, **kwargs):
        print(request.version)
        print(request.versioning_scheme)、url = request.versioning_scheme.reverse('home', request=request)
        print('反向生成URL：', url)
        
        return Response('...')
```

## 全局配置

在 `settings.py` 中配置后不需要再视图里写了

```python
# 

# DRF配置
REST_FRAMEWORK = {
    'UNAUTHENTICATED_USER': None,
    'VERSION_PARAM': 'version',
    'DEFAULT_VERSION': 'v1',  # 默认版本
    'ALLOWED_VERSIONS': ['v1', 'v2'],  # 只传存才的version
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.URLPathVersioning',  # 全局配置
}
```

```python
# urls.py
urlpatterns = [
    path('api/<str:version>/home/', views.HomeView.as_view(), name='home'),
]
```

```python
# views.py

class HomeView(APIView):
    def get(self, request, *args, **kwargs):
        # 直接可以拿来使用。
        url = request.versioning_scheme.reverse('home', request=request)
        print('反向生成URL：', url)

        return Response('...')
```
