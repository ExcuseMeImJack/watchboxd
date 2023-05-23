import ListForm from "../ListForm"

const ListCreate = () => {
    const list = {
        list_name: '',
        description: '',
        is_private: false,
        add_films: []
    }

    return (
        <ListForm
            list={list}
            formType={'create'}
        />
    )
}

export default ListCreate
