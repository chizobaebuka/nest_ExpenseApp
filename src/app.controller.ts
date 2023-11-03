import {Controller, Delete, Get, Post, Put, Param, Body, HttpCode} from '@nestjs/common'
import { ReportType, data } from './data'
import { v4 as uuid } from 'uuid'


@Controller('report/:type')
export class AppController {

  @Get('')
  getAllIncomeReports( @Param('type') type: string) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return data.report.filter((report) => report.type === reportType)
  }

  @Get('/:id')
  getAllIncomeReports2(
    @Param('type') type: string,
    @Param('id') id: string
    ) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return data.report.filter((report) => report.type === reportType).find((report) => report.id === id);
  }

  @Post('')
  createReport( @Body() {amount, source} :{ amount: number, source: string }, @Param('type') type: string ) {
    const newReport = {
      id: uuid(),
      amount,
      source,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    }
    data.report.push(newReport)
    return newReport
  }

  @Put(':id')
  updateReport( 
    @Param('id') id: string, 
    @Param('type') type: string,
    @Body() {amount, source} :{ amount: number, source: string } 
  ) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    const reportToUpdate = data.report.filter((report) => report.type === reportType).find((report) => report.id === id);
    if(!reportToUpdate) return;
    
    const reportIndex = data.report.findIndex((report) => report.id === reportToUpdate.id)
    data.report[reportIndex] = {
      ...reportToUpdate,
      amount,
      source,
      updated_at: new Date()
    }

    return data.report[reportIndex]
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport (
    @Param('id') id: string, 
    @Param('type') type: string,
  ) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if(reportIndex === -1) return;
    data.report.splice(reportIndex, 1)
    return data.report
  }
}