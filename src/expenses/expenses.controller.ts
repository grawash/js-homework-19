import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ExpensesService } from "./expenses.service";
import { CreateExpenseDto } from "./DTOs/create-expense.dto";
import { UpdateExpenseDto } from "./DTOs/update-expense.dto";


@Controller('expenses')
export class ExpensesController{
    constructor(private readonly expensesService: ExpensesService){}

    @Get()
    getExpenses(){
        return this.expensesService.getAllExpenses()
    }

    @Get(':id')
    getExpenseById(@Param() params){
        const id = Number(params.id)
        return this.expensesService.getExpenseById(id)
    }

    @Post()
    createExpense(@Body() body: CreateExpenseDto){
        return this.expensesService.createExpense(body)
    }

    @Delete(':id')
    deleteExpenseById(@Param() params){
        const id = Number(params.id)
        return this.expensesService.deleteExpenseById(id)
    }

    @Put(':id')
    updateExpense(@Param() params, @Body() body: UpdateExpenseDto){
        const id = Number(params.id)
        return this.expensesService.updateExpense(id,body)
    }
}