# cfx.events

Allows messages to be sent and received from different otherwise unconnected parts of an application.

## on(name, callback)

Registers an event listener with `cfx.events`. The callback will be called with whatever values the event was triggered with.

    cfx.events.on('myEvent', function(foo, bar) {
        console.log('myEvent triggered', foo, bar)
    })
    
## trigger(name, args...)

Triggers all listeners with the specified event name.  Passes all `args` through to the listener's callback.

    cfx.events.trigger('myEvent', 'hello', 'world')
    
    >> 'myEvent triggered', 'hello', 'world'
    
## Multiple listeners

You may register as many listeners as you like to the same event name. All of them will be triggered when the event is triggered.

    cfx.events.on('myEvent', function(foo, bar) {
        console.log('myEvent listener 1', foo, bar)
    })
    cfx.events.on('myEvent', function(foo, bar) {
        console.log('myEvent listener 2', bar, foo)
    })
    
    cfx.events.trigger('myEvent', 'hello', 'world')
        
    >> 'myEvent listener 1', 'hello', 'world'
    >> 'myEvent listener 2', 'world', 'hello'