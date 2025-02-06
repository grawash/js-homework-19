import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateExpenseDto } from "./DTOs/create-expense.dto";
import { UpdateExpenseDto } from "./DTOs/update-expense.dto";

@Injectable()
export class ExpensesService{
    private expenses = [
        {id: 1, category: 'shopping', price:240},
        {id: 2, category: 'entertainment', price:75}
    ]

    getAllExpenses(){
        return this.expenses
    }
    getExpenseById(id: number){
        const expense = this.expenses.find(el => el.id === id)
        if(!expense) throw new HttpException('expense not found', HttpStatus.NOT_FOUND)
        return expense
    }

    createExpense(body: CreateExpenseDto){
        const lastId = this.expenses[this.expenses.length-1]?.id || 0
        const newExpense = {
            id: lastId+1,
            category: body.category,
            price: body.price
        }
        this.expenses.push(newExpense)
        return newExpense
    }

    deleteExpenseById(id: number){
        const index = this.expenses.findIndex(el => el.id === id)
        if(index === -1){
            throw new HttpException('invalid expense id provided', HttpStatus.BAD_REQUEST)
        }
        const deletedExpense = this.expenses.splice(index, 1)
        return deletedExpense
    }

    updateExpense(id: number, body: UpdateExpenseDto){
        const index = this.expenses.findIndex(el => el.id === id)
        if(index === -1){
            throw new HttpException('invalid expense id provided', HttpStatus.BAD_REQUEST)
        }
        const updatedExpense = {
            id: id,
            category: body.category || this.expenses[index].category,
            price: body.price || this.expenses[index].price
        }
        this.expenses[index] = updatedExpense;
        return updatedExpense
    }
}