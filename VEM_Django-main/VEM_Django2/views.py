from django.shortcuts import redirect

def redirect_to_react_confirm_password(request,uid,token):
    return redirect(f'http://127.0.0.1:3000/password/reset/confirm/{uid}/{token}')


def redirect_to_react_confirm_gmail(request,uid,token):
    return redirect(f'http://127.0.0.1:3000/activate/{uid}/{token}')