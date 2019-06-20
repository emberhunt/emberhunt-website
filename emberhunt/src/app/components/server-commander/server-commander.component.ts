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
    logFileName = "";
    commandTextWithCommand = "$ " + this.commandFormData.text;
    commandText = this.commandTextWithCommand;
    gameServerLog = "";

    constructor(private gameService: GameService) { }

    ngOnInit() {
        this.gameService.getLogFileName().subscribe((fname: string) => {
            this.loading = false;
            this.logFileName = fname;
        });

        setInterval(() => {
            this.gameService.getLog().subscribe((data: string) => {
                this.loading = false;
                data = this.escapeHtml(data).replace(new RegExp("(\\$ .*)","g"), "<b>$1</b>")
                this.gameServerLog = data;
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
        this.commandTextWithCommand += '\n' + this.escapeHtml(response) + '$ ';
        this.commandText = this.commandTextWithCommand;
        this.commandFormData.text = "";
    }

    commandTextChanged() {
        this.commandTextWithCommand = this.escapeHtml(this.commandText + this.commandFormData.text);
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

}
