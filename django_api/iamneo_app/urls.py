from django.urls import re_path
from django_api.settings import MEDIA_URL
from iamneo_app import views
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    re_path(r'^details$', views.detailsAPIscreen),
    re_path(r'^details/delete/([0-9]+)$', views.detailsAPIscreen),

    re_path(r'^details/userimages$', views.SaveImageFile)
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)