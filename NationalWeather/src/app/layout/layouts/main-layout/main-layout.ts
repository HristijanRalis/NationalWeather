import { Component } from '@angular/core';
import { Header } from "../../components/header/header";
import { Sidebar } from "../../components/sidebar/sidebar";
import { AdditionalInfo } from "../../components/additional-info/additional-info";

@Component({
  selector: 'app-main-layout',
  imports: [Header, Sidebar, AdditionalInfo],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {

}
