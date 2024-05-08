# 路由配置

```python
# 早期版
urlpatterns = [
    re_path('users'/(\w+)/(\d+), views.UserView.as_view())
]

# 新版本
urlpatterns = [
    re_path('users'/<str:version>/<int:pid>/, views.UserView.as_view())
]
```
