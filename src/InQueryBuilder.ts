import { isNumber } from "util";

/***
 * Query builder that can take a new line separated list of strings
 * and return an SQL IN query template expression
 */
export default class InQueryBuilder {
    /**
     * A new line separated list of strings to build an expression for
     * @param text The text to parse
     */
    public getQuery(text: string, joinUsingNewLine: boolean, quoteNumbers: boolean, indentTextBy: string): string  {
        // Parse as lines
        let lines = this.getLines(text);

        // Bail early if no valid lines
        if (lines.length === 0) {
            return '';
        }

        // Build values to join
        let valuestoJoin = [];
        for(let i = 0; i < lines.length; i++) {
            const line : any = lines[i].trim();

            // Parse value
            let parsedValue;
            if (!quoteNumbers && !isNaN(line)) {
                parsedValue = line;
            } else {
                parsedValue = "'" + line + "'";
            }

            valuestoJoin.push(parsedValue);
        }

        // Build IN expression
        let expression;
        if (joinUsingNewLine) {
            expression = valuestoJoin.map(x => indentTextBy + x).join(",\n");
        } else {
            expression = valuestoJoin.join(", ");
        }

        // Return based on newLine join or not
        if (joinUsingNewLine) {
            return "(\n" + expression + "\n)";
        } else {
            return "(" + expression + ")";
        }
    }

    /**
     * Return a list of lines (or a zero result set if empty text)
     * @param text The text to parse
     */
    private getLines(text: string): string[] {
        // If the text appears empty, skip early
        if (text.length === 0) {
            return [];
        }

        // Split by new lines
        return text.split(/\r?\n/).filter(x => x);
    }
}