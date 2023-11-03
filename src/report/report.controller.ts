import {Controller, Delete, Get, Post, Put, Param, Body, HttpCode, ParseUUIDPipe, ParseEnumPipe} from '@nestjs/common'
import { ReportType } from '../data'
import { ReportService } from './report.service'
import { ReportResponseDTO, createReportDTO, updateReportDTO } from 'src/DTO/report.dto'

@Controller('report/:type')
export class ReportController {
  constructor (
    private readonly reportService: ReportService
  ) {}

  @Get('')
  getAllReports( @Param('type', new ParseEnumPipe(ReportType)) type: string): ReportResponseDTO[] {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.reportService.getAllReports(reportType)
  }

  @Get('/:id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string
    ) : ReportResponseDTO {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.reportService.getReportById(id, reportType)
  }

  @Post('')
  createReport( @Body() {amount, source} :createReportDTO, @Param('type', new ParseEnumPipe(ReportType)) type: string ) : ReportResponseDTO {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.reportService.createReport(reportType, {amount, source})
  }

  @Put(':id')
  updateReport( 
    @Param('id', ParseUUIDPipe) id: string, 
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Body() body :updateReportDTO 
  ) : ReportResponseDTO {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    return this.reportService.updateReport(id, reportType, body)
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport (
    @Param('id', ParseUUIDPipe) id: string
  ) {
    this.reportService.deleteReport(id)
  }
}