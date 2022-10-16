from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
# Create your views here.
from iamneo_app.serializers import DetailSerializer
from iamneo_app.models import Details
from django.core.files.storage import default_storage
@csrf_exempt
def detailsAPIscreen(request, id=0):
    #CREATE OPERATION
    if(request.method == 'POST'):
        ins_data = JSONParser().parse(request)
        details_serializer = DetailSerializer(data=ins_data)
        if(details_serializer.is_valid()):
            details_serializer.save()
            return JsonResponse("Data Added Successfully!", safe=False)
        return JsonResponse("Failed to Update: Try Again!", safe=False)
    #READ OPERATION
    elif(request.method == 'GET'):
        alldata = Details.objects.all()
        details_serializer = DetailSerializer(alldata, many=True)
        return JsonResponse(details_serializer.data, safe=False)
    #UPDATE OPERATION
    elif(request.method == 'PUT'):
        update_data = JSONParser().parse(request)
        update_id = Details.objects.get(UserID=update_data['UserID'])
        details_serializer = DetailSerializer(update_id, data=update_data)
        if(details_serializer.is_valid()):
            details_serializer.save()
            return JsonResponse("User details updated successfully!", safe=False)
        return JsonResponse("User updation failed: Try Again!", safe=False)
    #DELETE OPERATION
    elif(request.method == 'DELETE'):
        delete_id = Details.objects.get(UserID = str(id))
        delete_id.delete()
        return JsonResponse("User details deleted sucessfully!", safe=False)

@csrf_exempt
def SaveImageFile(request):
    img_file = request.FILES['UserImage']
    img_filename = default_storage.save(img_file.name, img_file)
    return JsonResponse(img_filename,safe=False)