import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
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

export function Register() {
	const navigate = useNavigate();
	const schema = yup
		.object({
			name: yup.string().required('Nome obrigatorio'),
			email: yup
				.string()
				.email('Digite um email valido')
				.required('Email obrigatorio'),
			password: yup
				.string()
				.min(6, 'Minimo 6 caracteres')
				.required('Senha obrigatoria'),
			confirmPassword: yup
				.string()
				.oneOf([yup.ref('password'), null], 'As senhas devem ser iguais')
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
		try {
			const { status } = await api.post(
				'/users',
				{
					name: data.name,
					email: data.email,
					password: data.password,
				},
				{
					validateStatus: () => true,
				},
			);

			if (status === 200 || status === 201) {
				setTimeout(() => {
					navigate('/login');
				}, 2000);
				toast.success('Cadastro realizado com sucesso!');
			} else if (status === 409) {
				toast.error('Email ja cadastrado');
			} else {
				throw new Error();
			}
		} catch (error) {
			toast.error('falha no cadastro');
		}
	};

	return (
		<Container>
			<LeftContainer>
				<img src={Logo} alt="logo-devburger" />
			</LeftContainer>
			<RighContainer>
				<Title>Criar Conta</Title>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<ImputContainer>
						<label>Nome</label>
						<input type="text" {...register('name')} />
						<p>{errors?.name?.message}</p>
					</ImputContainer>

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

					<ImputContainer>
						<label>Confimar Senha</label>
						<input type="password" {...register('confirmPassword')} />
						<p>{errors?.confirmPassword?.message}</p>
					</ImputContainer>
					<Button type="submit">Criar Conta</Button>
				</Form>
				<p>
					ja possui uma conta? <Link to="/login"> Clique aqui.</Link>
				</p>
			</RighContainer>
		</Container>
	);
}
