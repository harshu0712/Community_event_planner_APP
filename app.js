document.addEventListener("DOMContentLoaded", function () {

class Event {
constructor(id,title,category,date,time,location,description,creator,attendees){
this.id=id;
this.title=title;
this.category=category;
this.date=date;
this.time=time;
this.location=location;
this.description=description;
this.creator=creator;
this.attendees=attendees || [creator];
}
}

class EventManager{

constructor(){

this.events=[];
this.currentEventId=null;

const session=JSON.parse(localStorage.getItem('event_planner_session')||'{}');
this.currentUser=session.id||localStorage.getItem('currentUser')||'guest';

this.init();

}

init(){
this.setupEventListeners();
this.loadEvents();
}

setupEventListeners(){

const createBtn=document.getElementById("createEventBtn");
if(createBtn){
createBtn.addEventListener("click",()=>this.openEventModal());
}

const form=document.getElementById("eventForm");
if(form){
form.addEventListener("submit",(e)=>{
e.preventDefault();
this.saveEvent();
});
}

const closeModal=document.getElementById("closeEventModal");
if(closeModal){
closeModal.addEventListener("click",()=>this.closeEventModal());
}

const cancelBtn=document.getElementById("cancelEventBtn");
if(cancelBtn){
cancelBtn.addEventListener("click",()=>this.closeEventModal());
}

const closeDetail=document.getElementById("closeDetailModal");
if(closeDetail){
closeDetail.addEventListener("click",()=>this.closeDetailModal());
}

const closeDetailBtn=document.getElementById("closeDetailBtn");
if(closeDetailBtn){
closeDetailBtn.addEventListener("click",()=>this.closeDetailModal());
}

const searchInput=document.getElementById("searchInput");
if(searchInput){
searchInput.addEventListener("input",()=>this.renderEvents());
}

const categoryFilter=document.getElementById("categoryFilter");
if(categoryFilter){
categoryFilter.addEventListener("change",()=>this.renderEvents());
}

const rsvpBtn=document.getElementById("rsvpBtn");
if(rsvpBtn){
rsvpBtn.addEventListener("click",()=>this.toggleRSVP());
}

}

loadEvents(){

firebase.database().ref("events").on("value",(snapshot)=>{

this.events=[];

snapshot.forEach(child=>{

const data=child.val();

const event=new Event(
child.key,
data.title,
data.category,
data.date,
data.time,
data.location,
data.description,
data.creator,
data.attendees
);

this.events.push(event);

});

this.renderEvents();

});

}

openEventModal(event=null){

const modal=document.getElementById("eventModal");
if(!modal) return;

if(event){

document.getElementById("eventId").value=event.id;
document.getElementById("eventTitle").value=event.title;
document.getElementById("eventCategory").value=event.category;
document.getElementById("eventDate").value=event.date;
document.getElementById("eventTime").value=event.time;
document.getElementById("eventLocation").value=event.location;
document.getElementById("eventDescription").value=event.description;

}else{

document.getElementById("eventForm").reset();
document.getElementById("eventId").value="";

}

modal.classList.add("active");

}

closeEventModal(){

const modal=document.getElementById("eventModal");

if(modal){
modal.classList.remove("active");
}

}

saveEvent(){

const title=document.getElementById("eventTitle").value.trim();
const category=document.getElementById("eventCategory").value;
const date=document.getElementById("eventDate").value;
const time=document.getElementById("eventTime").value;
const location=document.getElementById("eventLocation").value.trim();
const description=document.getElementById("eventDescription").value.trim();

if(!title || !date || !time || !location){
alert("Please fill all required fields");
return;
}

const eventData={
title:title,
category:category,
date:date,
time:time,
location:location,
description:description,
creator:this.currentUser,
attendees:[this.currentUser]
};

firebase.database().ref("events").push(eventData)
.then(()=>{

alert("Event Created Successfully");

document.getElementById("eventForm").reset();

this.closeEventModal();

})
.catch((error)=>{

console.error("Error creating event:",error);
alert("Error creating event");

});

}

toggleRSVP(){

const event=this.events.find(e=>e.id===this.currentEventId);
if(!event) return;

let attendees=event.attendees || [];

if(attendees.includes(this.currentUser)){
attendees=attendees.filter(a=>a!==this.currentUser);
}else{
attendees.push(this.currentUser);
}

firebase.database().ref("events/"+event.id).update({
attendees:attendees
});

}

showEventDetail(event){

this.currentEventId=event.id;

const modal=document.getElementById("detailModal");
const content=document.getElementById("eventDetailContent");
const rsvpBtn=document.getElementById("rsvpBtn");

if(!modal) return;

const isAttending=event.attendees.includes(this.currentUser);

content.innerHTML=`
<h2>${event.title}</h2>
<p><b>Date:</b> ${event.date} ${event.time}</p>
<p><b>Location:</b> ${event.location}</p>
<p>${event.description}</p>
<p><b>Attendees:</b> ${event.attendees.length}</p>
`;

if(isAttending){
rsvpBtn.textContent="Cancel RSVP";
}else{
rsvpBtn.textContent="Join Event";
}

rsvpBtn.style.display="inline-block";

modal.classList.add("active");

}

closeDetailModal(){

const modal=document.getElementById("detailModal");

if(modal){
modal.classList.remove("active");
}

}

getFilteredEvents(){

const search=document.getElementById("searchInput")?.value.toLowerCase() || "";
const category=document.getElementById("categoryFilter")?.value || "all";

let filtered=this.events;

if(search){
filtered=filtered.filter(event =>
event.title.toLowerCase().includes(search) ||
event.description.toLowerCase().includes(search) ||
event.location.toLowerCase().includes(search)
);
}

if(category!=="all"){
filtered=filtered.filter(event => event.category===category);
}

return filtered;

}

renderEvents(){

const grid=document.getElementById("eventsGrid");

if(!grid) return;

const filtered=this.getFilteredEvents();

if(filtered.length===0){

grid.innerHTML=`<p style="text-align:center;width:100%">No events found</p>`;

return;

}

grid.innerHTML=filtered.map(event=>`

<div class="event-card" onclick="window.app.showEventDetail(window.app.events.find(e=>e.id==='${event.id}'))">

<h3>${event.title}</h3>
<p>📅 ${event.date} ${event.time}</p>
<p>📍 ${event.location}</p>
<p>${event.description}</p>
<p>👥 ${event.attendees.length} attending</p>

</div>

`).join("");

}

}

window.app=new EventManager();

});