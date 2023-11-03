import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsPositive, IsString, IsNotEmpty, IsOptional,  } from 'class-validator'
import { ReportType } from 'src/data';

export class createReportDTO {
    @IsNumber()
    @IsPositive()
    amount: number;
    @IsString()
    @IsNotEmpty()
    source: string;
}

export class updateReportDTO {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    amount: number;
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    source: string;
}

export class ReportResponseDTO {
    id: string;
    source: string;
    amount: number;
    
    
    @Expose({name: "createdAt"})
    transformCreatedAt() {
        return this.created_at.toDateString()
    }

    @Exclude()
    created_at: Date;

    @Exclude()
    updated_at: Date;
    type: ReportType;

    constructor(partial: Partial<ReportResponseDTO>) {
        Object.assign(this, partial);
    }
}