import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "../components/PaginationComp";
const mockOnPageChange=jest.fn()
describe("test layout wrapper",()=>{
    test("check whether layout is rendering",()=>{
        render(
           <Pagination currentPage={0} totalPages={0} onPageChange={mockOnPageChange} loading={false}/>
        )
        expect(screen.getByText("Previous")).toBeInTheDocument();
        expect(screen.getByText("Next")).toBeInTheDocument();
    });
   
})