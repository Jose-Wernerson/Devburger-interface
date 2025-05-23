import { yupResolver } from "@hookform/resolvers/yup"
import { Image } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup"
import { api } from "../../../services/api";
import {
    Container,
    ContainerCheckbox,
    ErrorMessage,
    Form,
    ImputGroup,
    Input, Label,
    LabelUpload,
    Select,
    SubmitButton
} from "./styles"

const schema = yup.
    object({
        name: yup.string().required('Nome obrigatorio'),
        price: yup
            .number()
            .positive()
            .required('Preço obrigatorio')
            .typeError('Preço obrigatorio'),
        category: yup.object().required('Categoria obrigatoria'),
        offer: yup.bool(),
        file: yup.mixed().test('required', 'Imagem obrigatoria', (value) => {
            return value && value.length > 0;
        })
            .test('fileSize', 'carregue arquivos menores que 5mb', (value) => {
                return value && value.length > 0 && value[0].size <= 50000;
            })
            .test('type', 'Apenas arquivos PNG e JPEG', (value) => {
                return (
                    value &&
                    value.length > 0 &&
                    (value[0].type === 'image/png' || value[0].type === 'image/jpeg')
                );
            }),
    });

export function NewProdut() {
    const [fileName, setFileName] = useState(null);
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function loadCategories() {
            const { data } = await api.get('/categories');

            setCategories(data);
        }
        loadCategories();
    }, []);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data) => {
        const productFormData = new FormData();
        productFormData.append('name', data.name);
        productFormData.append('price', data.price * 100);
        productFormData.append('category_id', data.category.id);
        productFormData.append('file', data.file[0]);
        productFormData.append('offer', data.offer);

        await toast.promise(api.post('/products', productFormData), {
            pending: 'Adicionando produto...',
            success: 'Produto adicionado com sucesso!',
            error: 'Erro ao adicionar produto!',
        })
        setTimeout(() => {
            navigate('/admin/produtos')
        }, 2000)
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ImputGroup>
                    <Label>Nome</Label>
                    <Input type="text" {...register('name')} />
                    <ErrorMessage>{errors?.Name?.message}</ErrorMessage>
                </ImputGroup>

                <ImputGroup>
                    <Label>preço</Label>
                    <Input type="number" {...register('price')} />
                    <ErrorMessage>{errors?.price?.message}</ErrorMessage>
                </ImputGroup>

                <ImputGroup>
                    <LabelUpload >
                        <Image />
                        <input
                            type="file"
                            {...register('file')}
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={(value) => {
                                setFileName(value?.target?.files[0]?.name)
                                register('file').onChange(value)
                            }}
                        />

                        {fileName || 'Selecione uma imagem'}
                    </LabelUpload>
                    <ErrorMessage>{errors?.file?.message}</ErrorMessage>
                </ImputGroup>

                <ImputGroup>
                    <Label>Categoria</Label>
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (

                            <Select
                                {...field}
                                options={categories}
                                getOptionLabel={(category) => category.name}
                                getOptionValue={(category) => category.id}
                                placeholder="Selecione uma categoria"
                                menuPortalTarget={document.body}
                            />
                        )} />
                    <ErrorMessage>{errors?.category?.message}</ErrorMessage>

                </ImputGroup>
                <ImputGroup>
                    <ContainerCheckbox>
                        <input
                            type="checkbox"
                            {...register('offer')}
                        />
                        <Label>Produto em Oferta</Label>
                    </ContainerCheckbox>
                </ImputGroup>
                <SubmitButton>Adicionar Produto</SubmitButton>
            </Form>

        </Container>
    )
}