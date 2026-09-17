// prevents TS errors
declare var self: Worker;

self.onmessage = (event: MessageEvent) => {
  if(event.type=='message'){

    const eventData= JSON.parse(event.data);
    



  }
};