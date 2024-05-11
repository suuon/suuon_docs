# 序列化器

## SerializerMethodField

```python
# serializers.py
class CommentSerializers(NsHookSerializer, serializers.ModelSerializer):
    xxx = serializers.SerializerMethodField()
    ...
    ...
     class Meta:
        model = models.Comment
        fields = ['xxx']
        extra_kwargs = {
            'id': {'read_only': True},
            'user': {'read_only': True},
        }
        
    def get_xxx(self, obj):
        return "{}--{}".format(obj.id, obj.user.username)
```

## ForeignKey

```python
# models.py
class Depart(models.Model):
    title = models.CharField(verbose_name='部门', max_length=32)
    order = models.IntegerField(verbose_name='顺序')
    count = models.IntegerField(verbose_name='人数')


class UserInfo(models.Model):
    ...
    ...
    depart = models.ForeignKey(verbose_name='部门', to='Depart', on_delete=models.CASCADE)
```

```python
# serializers.py
class DepartSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Depart
        fields = '__all__'
        
        
class BlogUserSerializers(serializers.ModelSerializer):
    depart = DepartSerializer()

    class Meta:
        model = models.UserInfo
        fields = ('id', 'username', 'depart', 'tags')

```

## ManyToManyField

```python
# models.py
# Tag
class Tag(models.Model):
    caption = models.CharField(verbose_name='标签', max_length=32)

# 
class UserInfo(models.Model):
    ...
    ...
    tags = models.ManyToManyField(verbose_name='标签', to='Tag')
```

```python
# serializers.py
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Tag
        fields = '__all__'
        
        
class BlogUserSerializers(serializers.ModelSerializer):
    # depart = DepartSerializer()
    tags = TagSerializer(many=True)

    class Meta:
        model = models.UserInfo
        fields = ('id', 'username', 'depart', 'tags')

```
