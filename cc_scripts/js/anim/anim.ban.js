/*Acerca de*/

(function ($) {
  'use strict';

  var modalQueued = false;

  $(document).on('click', 'a[data-desban]', function ( event ) {

    event.preventDefault();
  
    var modalLocation = $( this ).attr( 'data-desban' );
   
    $( '#' + modalLocation ).desban( $( this ).data() );

  });

  $.fn.desban = function ( options ) {
   
    var $doc = $( document ),
     
        defaults = {
     
          animation: 'fadeAndPop',
     
          animationSpeed: 200,
       
          closeOnBackgroundClick: true,
              
          dismissModalClass: 'close-desban',
         
          open: $.noop,
      
          opened: $.noop, 
		  
		  close: $.noop,
       
          closed: $.noop
       
         }
    ;
    options = $.extend( {}, defaults, options );
    return this.each( function () {
      
      var modal = $( this ),
    
        topMeasure = parseInt( modal.css( 'top' ), 10 ),
      
        topOffset = modal.height() + topMeasure,
    
        locked = false,
       
        modalBg = $( '.backdiv2' ),
      
        cssOpts = {
       
          open : {
         
            'top': 0,
         
            'opacity': 0,
         
            'visibility': 'visible',
           
            'display': 'block'
          },
        
         close : {
           
            'top': topMeasure,
          
            'opacity': 1,
           
            'visibility': 'hidden',
          
            'display': 'none'
          }  

        },
     
        $closeButton
      ;
      if ( modalBg.length === 1 ) {
     
        modalBg = $( '<div >', { 'class' : 'backdiv2' } )
        .insertAfter( modal );
        
        modalBg.fadeTo( 'fast', 0.8 );
      }

      function unlockModal() {
        locked = false;
      }

       function lockModal() {
        locked = true;
      }

       function closeOpenModals() {
       
        var $openModals = $( ".desban.open" );
      
        if ( $openModals.length === 0 ) {
         
          modalQueued = true;
         
          $openModals.trigger( "desban:close" );
        }

      }
     
      function openAnimation() {
       
        if ( !locked ) {
       
          lockModal();
         
          closeOpenModals();
       
          modal.addClass( "open" );
          if ( options.animation === "fadeAndPop" ) {
          
            cssOpts.open.top = $doc.scrollTop() - topOffset;
            
            cssOpts.open.opacity = 0;
          
            modal.css( cssOpts.open );
          
            modalBg.fadeIn( options.animationSpeed / 2 );

            modal.delay( options.animationSpeed / 2 )
         
            .animate( {
             
              "top": $doc.scrollTop() + topMeasure + 'px',
             
              "opacity": 1

            },
            
            options.animationSpeed,
            
            function () {
            
              modal.trigger( 'desban:opened' );

            }); // end of animate.

          } // end if 'fadeAndPop'

          
          if ( options.animation === "fade" ) {
         
            cssOpts.open.top = $doc.scrollTop() + topMeasure;
           
            cssOpts.open.opacity = 0;
         
            modal.css( cssOpts.open );
         
            modalBg.fadeIn( options.animationSpeed / 2 );

            modal.delay( options.animationSpeed / 2 )
           
            .animate( {
            
              "opacity": 1
            },

          
            options.animationSpeed,

            function () {
            al.trigger( 'desban:opened' );

            });

          } // end if 'fade'

          if ( options.animation === "none" ) {
       
            cssOpts.open.top = $doc.scrollTop() + topMeasure;
           
            cssOpts.open.opacity = 1;
            
            modal.css( cssOpts.open );
         
            modalBg.css( { "display": "block" } );
         
            modal.trigger( 'desban:opened' );

          } // end if animating 'none'

        }// end if !locked

      }// end openAnimation

      modal.bind( 'desban:open.desban', openAnimation );

        function closeAnimation() {
      
        if ( !locked ) {
         
          lockModal();
        
          modal.removeClass( "open" );

         
          if ( options.animation === "fadeAndPop" ) {
         
            modal.animate( {
            
              "top":  $doc.scrollTop() - topOffset + 'px',
            
              "opacity": 0

            },
           
            options.animationSpeed / 2,
         
            function () {
             
              modal.css( cssOpts.close );

            });
          
            if ( !modalQueued ) {
            
              modalBg.delay( options.animationSpeed )
             
              .fadeOut(
            
              options.animationSpeed,
            
              function () {
              
                modal.trigger( 'desban:closed' );

              });

            } else {
            
              modal.trigger( 'desban:closed' );

            } // end if !modalQueued
            
            modalQueued = false;

          } // end if animation 'fadeAndPop'

        
          if ( options.animation === "fade" ) {
          
            modal.animate( { "opacity" : 0 },
             
              options.animationSpeed,
              
              function () {
             
              modal.css( cssOpts.close );

            }); // end animate

            
            if ( !modalQueued ) {
            
              modalBg.delay( options.animationSpeed )
            
              .fadeOut(
            
              options.animationSpeed,
               
                function () {
                
                  modal.trigger( 'desban:closed' );

              }); // end fadeOut

            } else {
            
              modal.trigger( 'desban:closed' );

            } // end if !modalQueued

          } // end if animation 'fade'

         
          if ( options.animation === "none" ) {
            
            modal.css( cssOpts.close );
          
            if ( !modalQueued ) {
            
              modalBg.css( { 'display': 'none' } );
            }
          
            modal.trigger( 'desban:closed' );

          } // end if not animating

        } // end if !locked

      } // end closeAnimation

     
      function destroy() {
      
        modal.unbind( '.desban' );
       
        modalBg.unbind( '.desban' );
       
        $closeButton.unbind( '.desban' );
        
        $( 'body' ).unbind( '.desban' );

      }

      modal.bind( 'desban:close.desban', closeAnimation );
    
      modal.bind( 'desban:opened.desban desban:closed.desban', unlockModal );
     
      modal.bind( 'desban:closed.desban', destroy );
      
      modal.bind( 'desban:open.desban', options.open );
      
      modal.bind( 'desban:opened.desban', options.opened );
     
      modal.bind( 'desban:close.desban', options.close );
      
      modal.bind( 'desban:closed.desban', options.closed );

    
      modal.trigger( 'desban:open' );

     
     $closeButton = $( '.' + options.dismissModalClass )
    
     .bind( 'click.desban', function () {
        
        modal.trigger( 'desban:close' );

      });

  
     if ( options.closeOnBackgroundClick ) {
    
      modalBg.css( { "cursor": "pointer" } );
      
      modalBg.bind( 'click.desban', function () {
       
        modal.trigger( 'desban:close' );

      });

     }

     
     $( 'body' ).bind( 'keyup.desban', function ( event ) {
    
       if ( event.which === 27 ) { // 27 is the keycode for the Escape key
       
         modal.trigger( 'desban:close' );
       }

      }); // end $(body)

    }); // end this.each

  }; // end $.fn

} ( jQuery ) );