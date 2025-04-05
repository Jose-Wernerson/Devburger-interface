import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useUser } from '../../hooks/UserContext';
import { api } from '../../services/api';

import Logo from '../../assets/logo.svg';
import { Button } from '../../components/Button';
import {
	Container,
	Form,
	ImputContainer,
	LeftContainer,
	Link,
	RighContainer,
	Title,
} from './styles';

export function Login() {
	const navigate = useNavigate();
	const { putUserData } = useUser();
	const schema = yup
		.object({
			email: yup
				.string()
				.email('Digite um email valido')
				.required('Email obrigatorio'),
			password: yup
				.string()
				.min(6, 'Minimo 6 caracteres')
				.required('Senha obrigatoria'),
		})
		.required();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		const { data: userData } = await toast.promise(
			api.post('/session', {
				email: data.email,
				password: data.password,
			}),
			{
				pending: 'Aguarde...',
				success: {
					render() {
						setTimeout(() => {
							if (userData?.admin) {
								navigate('/admin/pedidos')
							} else {
								navigate('/')
							}

						}, 2000);

						return 'Login realizado com sucesso!';
					},
				},
				error: 'Email ou senha incorretos',
			},
		);
		putUserData(userData);
	};

	return (
		<Container>
			<LeftContainer>
				<img src={Logo} alt="logo-devburger" />
			</LeftContainer>
			<RighContainer>
				<Title>
					Olá, seja bem vindo ao <span>Dev Burguer!</span>
					<br />
					Acesse com seu <span> Login e senha.</span>
				</Title>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<ImputContainer>
						<label>Email</label>
						<input type="email" {...register('email')} />
						<p>{errors?.email?.message}</p>
					</ImputContainer>

					<ImputContainer>
						<label>Senha</label>
						<input type="password" {...register('password')} />
						<p>{errors?.password?.message}</p>
					</ImputContainer>
					<Button type="submit">Entrar</Button>
				</Form>
				<p>
					Não possui conta? <Link to="/cadastro"> Clique aqui.</Link>
				</p>
			</RighContainer>
		</Container>
	);
}
