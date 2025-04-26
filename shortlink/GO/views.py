from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Link, Counter
import random
import json


# Create your views here.
def home(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            linkA = data.get('linkA') # Use .get() to avoid KeyError
            if not (linkA.startswith("https://") or linkA.startswith("http://")):
                linkA = "https://" + linkA
            try:
                link = Link.objects.get(linkA = linkA)
                linkB = link.linkB
                linkB_js = "https://go.a1s.kz/" + linkB
                return JsonResponse({'linkB': linkB_js})
            except:
                linkB = rand_chars()
                counter = Counter.objects.get(id=1)
                new_link = Link(id=counter.value%800, linkA = linkA, linkB = linkB)
                new_link.save()
                counter.value+=1
                counter.save()
                linkB_js = "https://go.a1s.kz/" + linkB
            return JsonResponse({'linkB': linkB_js})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return render(request, 'home.html')

def redir(request, linkB):
    try:
        link = Link.objects.get(linkB=linkB)
        return redirect(link.linkA)
    except:
        return redirect('home')

def rand_chars():
    chars_list = [chr(i) for i in range(97, 123)] + [chr(i) for i in range(65, 91)] + [str(i) for i in range(10)]
    char1 = chars_list[random.randint(0, 61)]
    char2 = chars_list[random.randint(0, 61)]
    try:
        _ = Link.objects.get(linkB=char1+char2)
        return rand_chars()
    except:
        return (char1 + char2)

def start_counter():
    new_counter = Counter(id=1, value=1)
    new_counter.save()