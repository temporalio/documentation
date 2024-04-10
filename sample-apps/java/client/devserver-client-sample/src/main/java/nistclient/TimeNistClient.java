package nistclient;

import java.io.InputStream;
import java.net.Socket;
import java.text.DateFormat;
import java.util.Date;
import java.util.TimeZone;
import java.util.concurrent.TimeUnit;
import java.text.SimpleDateFormat;

// Fetch the GMT time from the US National Institute of Standards and Technology
// Caution: Set up your retry policy so it will not hit this socket again before 5 seconds have elapsed.

public class TimeNistClient {
    public static String getTime() throws Exception {

        // Time is available on port 37
        Socket socket = new Socket("time.nist.gov", 37);
        InputStream inStream = socket.getInputStream();

        // Read 4 bytes from NIST
        byte[] bytes = new byte[4];
        int count = inStream.read(bytes);
        if (count < 4) {
            throw new Exception("Unable to fetch time packet from time.nist.gov");
        }

        // The 4 bytes represent a 32-bit unformatted binary number
        // that represents the time in UTC seconds since January 1, 1900
        int intValue =
            ((bytes[0] & 0xFF) << 24) |
            ((bytes[1] & 0xFF) << 16) |
            ((bytes[2] & 0xFF) << 8) |
            ((bytes[3] & 0xFF) << 0);
        
        // Convert to an unsigned long
        long longValue = intValue & 0xFFFFFFFFL;

        // Adjust for the Unix epoch
        longValue -= 2208988800L;

        // Construct a date
        Date date = new Date(TimeUnit.SECONDS.toMillis(longValue));

        // Fix the time to GMT, and not where the Worker is hosted
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        sdf.setTimeZone(TimeZone.getTimeZone("GMT"));
        return "GMT Date: " + sdf.format(date);
    }
}
