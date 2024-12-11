wp.blocks.registerBlockType("kwplugin/simple-gallery", {
  title: 'My Simple Image Gallery',
  icon: "format-gallery",
  category: "common",
  attributes: {
    arrIds: {type: 'array'}
  },
  edit: function(props) {

    let file_frame;
    let attachmentArray;

    function getSelectionIds(event) {
      event.preventDefault();
    
      file_frame = wp.media({
        title: 'Select an image',
        button: {
          text: 'Use this image',
        },
        multiple: true
      });

      file_frame.on('select', function() {
        attachmentArray = file_frame.state().get('selection').map(function(attachment) {
          attachment.toJSON();
          return attachment.attributes.id;// different 'attributes' ( is prop in attachment obj)
        });

        props.setAttributes({arrIds: attachmentArray});
      });

      file_frame.open();
    }

    return (
      <div>
        <input id="choose" type="button" name="choose" className="choose" value="Choose Image" onClick={getSelectionIds}/>
      </div>
    )
  },
  save: function(props) {
    return null;
  },
});