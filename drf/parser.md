# 解析器

**解析器一般是 `POST` 请求**

默认是以下3种解析器，但实际应用中建议手动配置，以防不必要的错误。

`parser_classes = [JSONParser]`

```shell
[<class 'rest_framework.parsers.JSONParser'>, <class 'rest_framework.parsers.FormParser'>, <class 'rest_framework.parsers.MultiPartParser'>]
```

## JSONParser

```python
# views.py

class HomeView(APIView):
    # 所有的解析器
    parser_classes = [JSONParser, FormParser]
    # 根据请求，匹配对应的解析器
    content_negotiation_class = DefaultContentNegotiation

    def get(self, request, *args, **kwargs):
        url = request.versioning_scheme.reverse('home', request=request)
        print('反向生成URL：', url)

        return Response('...')

    def post(self, request, *args, **kwargs):
        print(request.data, type(request.data))
```

**POST请求内容**

```json
{
  "name": "南光彬",
  "age": "88"
}
```

**请求结果**

```shell
{'name': '南光彬', 'age': '88'} <class 'dict'>
```

## FileUploadParser

### 单一上传文件

`FileUploadParser` 는 Django REST framework에서 제공되는 파일 업로드를 처리하는 데 사용되는 `parser` 중 하나입니다. 이 `parser`를 사용하면 클라이언트가 HTTP
요청으로 파일을 업로드할 때
해당 파일을 서버 측에서 처리할 수 있습니다.

```python
from rest_framework.parsers import FileUploadParser

class YourUploadView(APIView):
    parser_classes = [FileUploadParser]

    def post(self, request, format=None):
        # 파일 업로드를 처리하는 코드 작성
        pass
```

## MultiPartParser

MultiPartParser는 Django REST framework에서 제공되는 파서 중 하나로, 멀티파트 폼 데이터를 처리하는 데 사용됩니다. 멀티파트 폼 데이터는 파일 업로드와 함께 텍스트 데이터를 함께 보낼
때 사용됩니다. 이는 HTML `<form>` 요소의 enctype="multipart/form-data" 속성으로 전송되는 데이터를 다룹니다.

```python
from rest_framework.parsers import MultiPartParser

class YourUploadView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request, format=None):
        # 멀티파트 폼 데이터 처리 코드 작성
        pass
```
