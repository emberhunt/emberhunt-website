import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';


@Component({
    selector: 'app-server-commander',
    templateUrl: './server-commander.component.html',
    styleUrls: ['./server-commander.component.css']
})
export class ServerCommanderComponent implements OnInit {
    commandFormData = { text: 'fps' };
    loading = true;
    logFileName = ""
    allData = "";
    log = "";

    constructor(private gameService: GameService) { }

    ngOnInit() {
        this.gameService.getLogFileName().subscribe((fname: string) => {
            this.loading = false;
            this.logFileName = fname;
        });

        setInterval(() => {
            this.gameService.getLog().subscribe((data: string) => {
                this.loading = false;
                this.log = data;
            })
        }, 2000);
    }

    sendCommand() {
        if (this.commandFormData.text) {
            this.loading = true;
            this.gameService.sendCommand(this.commandFormData).subscribe(response => this.handleCommandResponse(response))
        }
    }

    handleCommandResponse(response) {
        this.loading = false;
        this.allData += response;
        this.commandFormData.text = "";
        setTimeout(() => {
            // this is not the angular way to do it but I don't want to look it up
            const elem = document.getElementById('command-window');
            elem.scrollTop = elem.scrollHeight;
        }, 1);
    }

}
