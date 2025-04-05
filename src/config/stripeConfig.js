import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
	'pk_test_51R8Sa9RehNutrk7W9PJdLmnmWEgZtWnzAGJ7ncZEriNk7ixeAYad7T0thwWzULo217pBBityxmHKlmpPdUf4Pszr00dP1dKTjl',
);

export default stripePromise;
