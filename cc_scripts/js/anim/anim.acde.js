/*Acerca de*/

(function ($) {
  'use strict';

  var modalQueued = false;

  $(document).on('click', 'a[data-acerca-de]', function ( event ) {

    event.preventDefault();
  
    var modalLocation = $( this ).attr( 'data-acerca-de' );
   
    $( '#' + modalLocation ).reveal( $( this ).data() );

  });

  $.fn.reveal = function ( options ) {
   
    var $doc = $( document ),
     
        defaults = {
     
          animation: 'fadeAndPop',
     
          animationSpeed: 300,
       
          closeOnBackgroundClick: true,
              
          dismissModalClass: 'close-acerca-de',
         
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
       
        modalBg = $( '.acerca-de-bg' ),
      
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
      if ( modalBg.length === 0 ) {
     
        modalBg = $( '<div />', { 'class' : 'acerca-de-bg' } )
       
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
       
        var $openModals = $( ".acerca-de.open" );
      
        if ( $openModals.length === 1 ) {
         
          modalQueued = true;
         
          $openModals.trigger( "reveal:close" );
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
            
              modal.trigger( 'reveal:opened' );

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
            al.trigger( 'reveal:opened' );

            });

          } // end if 'fade'

          if ( options.animation === "none" ) {
       
            cssOpts.open.top = $doc.scrollTop() + topMeasure;
           
            cssOpts.open.opacity = 1;
            
            modal.css( cssOpts.open );
         
            modalBg.css( { "display": "block" } );
         
            modal.trigger( 'reveal:opened' );

          } // end if animating 'none'

        }// end if !locked

      }// end openAnimation

      modal.bind( 'reveal:open.reveal', openAnimation );

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
              
                modal.trigger( 'reveal:closed' );

              });

            } else {
            
              modal.trigger( 'reveal:closed' );

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
                
                  modal.trigger( 'reveal:closed' );

              }); // end fadeOut

            } else {
            
              modal.trigger( 'reveal:closed' );

            } // end if !modalQueued

          } // end if animation 'fade'

         
          if ( options.animation === "none" ) {
            
            modal.css( cssOpts.close );
          
            if ( !modalQueued ) {
            
              modalBg.css( { 'display': 'none' } );
            }
          
            modal.trigger( 'reveal:closed' );

          } // end if not animating

        } // end if !locked

      } // end closeAnimation

     
      function destroy() {
      
        modal.unbind( '.reveal' );
       
        modalBg.unbind( '.reveal' );
       
        $closeButton.unbind( '.reveal' );
        
        $( 'body' ).unbind( '.reveal' );

      }

      modal.bind( 'reveal:close.reveal', closeAnimation );
    
      modal.bind( 'reveal:opened.reveal reveal:closed.reveal', unlockModal );
     
      modal.bind( 'reveal:closed.reveal', destroy );
      
      modal.bind( 'reveal:open.reveal', options.open );
      
      modal.bind( 'reveal:opened.reveal', options.opened );
     
      modal.bind( 'reveal:close.reveal', options.close );
      
      modal.bind( 'reveal:closed.reveal', options.closed );

    
      modal.trigger( 'reveal:open' );

     
     $closeButton = $( '.' + options.dismissModalClass )
    
     .bind( 'click.reveal', function () {
        
        modal.trigger( 'reveal:close' );

      });

  
     if ( options.closeOnBackgroundClick ) {
    
      modalBg.css( { "cursor": "pointer" } );
      
      modalBg.bind( 'click.reveal', function () {
       
        modal.trigger( 'reveal:close' );

      });

     }

     
     $( 'body' ).bind( 'keyup.reveal', function ( event ) {
    
       if ( event.which === 27 ) { // 27 is the keycode for the Escape key
       
         modal.trigger( 'reveal:close' );
       }

      }); // end $(body)

    }); // end this.each

  }; // end $.fn

} ( jQuery ) );