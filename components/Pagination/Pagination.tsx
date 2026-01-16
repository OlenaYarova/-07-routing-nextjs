import css from "@/components/Pagination/Pagination.module.css"
import ReactPaginate from 'react-paginate';


interface PaginationProps{
    totalPages: number,
    page: number,
    onSetPage: (newPage: number) => void;
}




export default function Pagination({ totalPages, page, onSetPage }: PaginationProps) {
    return (
        <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => onSetPage(selected + 1)}
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
        />);
}
