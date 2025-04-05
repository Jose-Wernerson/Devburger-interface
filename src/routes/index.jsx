import { Route, Routes } from 'react-router-dom';
import { Cart, Checkout, CompletePayment, EditProduct, Home, Login, Menu, NewProdut, Orders, Products, Register } from '../containers';
import { AdminLayout } from '../layouts/AdminLayout';
import { UserLayout } from '../layouts/UserLayout';



export function Router() {

	return (
		<Routes>
			<Route path='/' element={<UserLayout />}>
				<Route path='/' element={<Home />} />
				<Route path='/cardapio' element={<Menu />} />
				<Route path='/carrinho' element={<Cart />} />
				<Route path='/checkout' element={<Checkout />} />
				<Route path='/complete' element={<CompletePayment />} />

			</Route>

			<Route path='/admin' element={<AdminLayout />}>
				<Route path='/admin/pedidos' element={<Orders />} />
				<Route path='/admin/novo-produto' element={<NewProdut />} />
				<Route path='/admin/editar-produto' element={<EditProduct />} />
				<Route path='/admin/produtos' element={<Products />} />
			</Route>

			<Route path='/Login' element={<Login />} />
			<Route path='/cadastro' element={<Register />} />
		</Routes>
	)
}

// export const router = createBrowserRouter([
// 	{
// 		path: '/',
// 		element: (
// 			<>
// 				<Header />
// 				<Home />
// 				<Footer />
// 			</>
// 		),
// 	},
// 	{
// 		path: '/login',
// 		element: (
// 			<>
// 				<Login />
// 				<Footer />
// 			</>
// 		)
// 	},
// 	{
// 		path: '/cadastro',
// 		element:
// 			(
// 				<>
// 					<Register />
// 					<Footer />
// 				</>
// 			)
// 	},
// 	{
// 		path: '/cardapio',
// 		element: (
// 			<>
// 				<Header />
// 				<Menu />
// 				<Footer />
// 			</>
// 		),
// 	},
// 	{
// 		path: '/carrinho',
// 		element: <Cart />,
// 	},
// 	{
// 		path: '/checkout',
// 		element: <Checkout />,
// 	},
// 	{
// 		path: '/complete',
// 		element: <CompletePayment />,
// 	}
// ]);
