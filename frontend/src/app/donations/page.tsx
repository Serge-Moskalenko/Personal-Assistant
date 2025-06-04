"use client";
import { http } from "@/shared/services/mainAxios";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function DonationsPage() {
  const handleDonate = async () => {
    try {
      const response = await http.post("/payments/create-checkout-session/");
      const data = response.data;
      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId: data.id });
      }
    } catch (error) {
      alert("Payment error");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      bgcolor="#f5f5f5"
    >
      <Card sx={{ minWidth: 350, maxWidth: 400, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Support Our Project
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            gutterBottom
          >
            Your donation helps us improve and maintain Personal Assistant.
            Thank you for your support!
          </Typography>
          <Box display="flex" justifyContent="center" mt={3}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleDonate}
            >
              Donate with Stripe
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
