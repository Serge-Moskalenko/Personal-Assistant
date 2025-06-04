import stripe
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

stripe.api_key = settings.STRIPE_SECRET_KEY

@csrf_exempt
def create_checkout_session(request):
    if request.method == "POST":
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": "usd",
                    "product_data": {"name": "Donation"},
                    "unit_amount": 500,  # $5.00
                },
                "quantity": 1,
            }],
            mode="payment",
            success_url="http://localhost:3000/donations?success=true",
            cancel_url="http://localhost:3000/donations?canceled=true",
        )
        return JsonResponse({"id": session.id})
    return JsonResponse({"error": "Invalid request"}, status=400)
