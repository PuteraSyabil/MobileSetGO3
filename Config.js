class Config
{
    constructor(backgroundColour, framework,type,footer)
    {
        this.backgroundColour= backgroundColour;
        this.framework=framework;
        this.type=type;
        this.footer=footer;

    }
    setType(type)
    {
        this.type=type;
    }
    setBackgroundColour(backgroundColour)
    {
        this.backgroundColour=backgroundColour;
    }
    setFramework(framework)
    {
        this.framework=framework;
    }
    setFooter(footer)
    {
        this.footer= footer;
    }
   
}

module.exports=Config;