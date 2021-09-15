import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import '../support.css';
import './ResultPanel.css'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Box from '@material-ui/core/Box';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
export default function ResultPanel(props) {

    const handleTextChange = (e) => {
        props.setBrunText(e.target.value)
    }

    return (
        <div className="output">
            <div class="row">
            <div class="block">
                <Typography variant="h5" component="h2">
                    Run result: 
                </Typography>
            </div>
            <div class="block">
                    {props.result}
                </div>
            </div>
            <div class="row">
                <div class="block">
                    brun
                </div>
                <div className="right-wrapper">
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    startIcon={<PlayArrowIcon />}
                    onClick={() => { props.brunBuild() }}
                >brun</Button>
                </div>
                
            </div>
            <TextareaAutosize aria-label="empty textarea"
                 minRows={3}
                 class="text_item"
                 placeholder="Enter a command"
                 value={props.brunText}
                 onChange={handleTextChange}
                 />
            <div class="row">
                <div class="block">
                    <Typography variant="h5" component="h2"> Brun result:</Typography>
                </div>
                <div class="block">
                    <Typography variant="h5" component="h2">
                        {props.brunResult}
                    </Typography>
                </div>
            </div>
        </div>
    );
}