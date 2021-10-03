import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as fastcsv from 'fast-csv';

@Injectable()
export class AppService {
  async generate_daily_report(data) {
    const current_date = new Date().toDateString().split(' ').join('_');
    const stream = fs.createWriteStream(__dirname + `/${current_date}_report.csv`,);
    fastcsv.write(data, { headers: true }).pipe(stream);
    console.log(data)
  }
}
