import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateExpenseDto } from "./DTOs/create-expense.dto";
import { UpdateExpenseDto } from "./DTOs/update-expense.dto";

@Injectable()
export class ExpensesService {
    private expenses = [
        { id: 1, category: 'shopping', productName: 'Laptop', quantity: 1, price: 240, totalPrice: 240 },
        { id: 2, category: 'entertainment', productName: 'Movie Ticket', quantity: 3, price: 25, totalPrice: 75 }
    ];

    getAllExpenses() {
        return this.expenses;
    }

    getExpenseById(id: number) {
        const expense = this.expenses.find(el => el.id === id);
        if (!expense) throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
        return expense;
    }

    createExpense(body: CreateExpenseDto) {
        const lastId = this.expenses[this.expenses.length - 1]?.id || 0;
        const newExpense = {
            id: lastId + 1,
            category: body.category,
            productName: body.productName,
            quantity: body.quantity,
            price: body.price,
            totalPrice: body.quantity * body.price
        };
        this.expenses.push(newExpense);
        return newExpense;
    }

    deleteExpenseById(id: number) {
        const index = this.expenses.findIndex(el => el.id === id);
        if (index === -1) {
            throw new HttpException('Expense Not Found', HttpStatus.NOT_FOUND);
        }
        const deletedExpense = this.expenses.splice(index, 1);
        return deletedExpense;
    }

    updateExpense(id: number, body: UpdateExpenseDto) {
        const index = this.expenses.findIndex(el => el.id === id);
        if (index === -1) {
            throw new HttpException('Invalid expense ID provided', HttpStatus.BAD_REQUEST);
        }
        const updatedExpense = {
            ...this.expenses[index],
            category: body.category || this.expenses[index].category,
            productName: body.productName || this.expenses[index].productName,
            quantity: body.quantity || this.expenses[index].quantity,
            price: body.price || this.expenses[index].price,
            totalPrice: (body.quantity || this.expenses[index].quantity) * (body.price || this.expenses[index].price) // Recalculate total price
        };
        this.expenses[index] = updatedExpense;
        return updatedExpense;
    }
}
