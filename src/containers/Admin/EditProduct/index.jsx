import { yupResolver } from "@hookform/resolvers/yup"
import { Image } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup"
import { api } from "../../../services/api";
import {
    Container,
    ContainerCheckbox,
    ErrorMessage,
    Form,
    ImputGroup,
    Input,
    Label,
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
    });

export function EditProduct() {
    const [fileName, setFileName] = useState(null);
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    const {
        state: { product },
    } = useLocation();

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

        await toast.promise(api.put(`/products/${product.id}`, productFormData), {
            pending: 'Editando produto...',
            success: 'Produto editado com sucesso!',
            error: 'Erro ao editar produto!',
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
                    <Input
                        type="text"
                        {...register('name')}
                        defaultValue={product.name}
                    />
                    <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                </ImputGroup>

                <ImputGroup>
                    <Label>preço</Label>
                    <Input
                        type="number"
                        {...register('price')}
                        defaultValue={product.price / 100}
                    />
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
                        defaultValue={product.category}
                        render={({ field }) => (

                            <Select
                                {...field}
                                options={categories}
                                getOptionLabel={(category) => category.name}
                                getOptionValue={(category) => category.id}
                                placeholder="Selecione uma categoria"
                                menuPortalTarget={document.body}
                                defaultValue={product.category}
                            />
                        )} />

                    <ErrorMessage>{errors?.category?.message}</ErrorMessage>

                </ImputGroup>

                <ImputGroup>
                    <ContainerCheckbox>
                        <input
                            type="checkbox"
                            defaultChecked={product.offer}
                            {...register('offer')}
                        />
                        <Label>Produto em Oferta</Label>
                    </ContainerCheckbox>
                </ImputGroup>

                <SubmitButton>Editar Produto</SubmitButton>
            </Form>

        </Container>
    )
}