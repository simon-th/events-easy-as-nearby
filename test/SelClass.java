package newSelPack;

import java.net.MalformedURLException;
import java.net.URL;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.interactions.Action;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.Select;

public class SelClass {

	public static void main(String[] args) throws InterruptedException, MalformedURLException {
		System.setProperty("webdriver.gecko.driver", "D://geckodriver/geckodriver.exe");
		DesiredCapabilities capabilities = DesiredCapabilities.firefox();
		capabilities.setCapability("marionette", true);

		//location stuff
		FirefoxProfile geoDisabled = new FirefoxProfile();
		geoDisabled.setPreference("geo.enabled", false);
		geoDisabled.setPreference("geo.provider.use_corelocation", false);
		geoDisabled.setPreference("geo.prompt.testing", false);
		geoDisabled.setPreference("geo.prompt.testing.allow", false);
		//		DesiredCapabilities capabilities2 = DesiredCapabilities.firefox();
		capabilities.setCapability(FirefoxDriver.PROFILE, geoDisabled);

		//create new acct
		WebDriver driver = new FirefoxDriver();
		/*createAcct(driver);
		Thread.sleep(5000);*/

		//create new acct with same email (error)
		//		createSameAcct(driver);
		//		Thread.sleep(5000);

		//log in with wrong password
		//		loginError(driver);
		//		Thread.sleep(5000);

		//go to http://localhost:3000/myaccount
		//		myacct(driver);
		//		Thread.sleep(5000);

		//go to http://localhost:3000/myevents
		//		myevents(driver);
		//		Thread.sleep(5000);

		//log in with right password (home/map)
		//		login(driver);
		//		Thread.sleep(5000);
		//		driver.quit();

//		filterCategories(driver);
//		Thread.sleep(5000);

		filterDate(driver);
		Thread.sleep(5000);
	}

	//create an account with an email that's already been created
	public static void createAcct(WebDriver driver) {
		driver.get("http://localhost:3000/");
		WebElement link = driver.findElement(By.partialLinkText("Login"));
		link.click();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		WebElement signup = driver.findElement(By.partialLinkText("Sign"));
		signup.click();
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		WebElement user = driver.findElement(By.id("username"));
		WebElement email = driver.findElement(By.id("email"));
		WebElement pass1 = driver.findElement(By.id("passwordOne"));
		WebElement pass2 = driver.findElement(By.id("passwordTwo"));

		user.sendKeys("beardedsunshine");
		email.sendKeys("jovvylicious@gmail.com");
		pass1.sendKeys("jovin291");
		pass2.sendKeys("jovin291");

		WebElement submit = driver.findElement(By.id("submitB"));
		submit.click();
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		driver.quit();
	}

	public static void createSameAcct(WebDriver driver) {
		createAcct(driver);
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		driver.quit();
	}

	//login with wrong password 
	public static void loginError(WebDriver driver) {
		driver.get("http://localhost:3000/");
		WebElement link = driver.findElement(By.partialLinkText("Login"));
		link.click();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		WebElement email = driver.findElement(By.id("email"));
		WebElement pass = driver.findElement(By.id("password"));
		WebElement submit = driver.findElement(By.id("submitB"));

		email.sendKeys("jovvylicious@gmail.com");
		pass.sendKeys("wrongpass");
		submit.click();

		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		driver.quit();

	}

	public static void myacct(WebDriver driver) {
		driver.get("http://localhost:3000/myaccount");
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		driver.quit();
	}

	public static void myevents(WebDriver driver) {
		driver.get("http:localhost:3000/myevents");
		try {
			Thread.sleep(2000);
		}
		catch(InterruptedException e) {
			e.printStackTrace();
		}
		driver.quit();
	}

	public static void login (WebDriver driver) {
		driver.get("http://localhost:3000");
		WebElement link = driver.findElement(By.partialLinkText("Login"));
		link.click();
		try {
			Thread.sleep(2000);
		}
		catch(InterruptedException e) {
			e.printStackTrace();
		}

		WebElement user = driver.findElement(By.id("email"));
		WebElement pass = driver.findElement(By.id("password"));
		WebElement submit = driver.findElement(By.id("submitB"));
		user.sendKeys("jovvylicious@gmail.com");
		pass.sendKeys("jovin1998");
		submit.click();
		try {
			Thread.sleep(5000);
		}
		catch(InterruptedException e) {
			e.printStackTrace();
		}

		//driver.quit();

	}

	public static void filterCategories(WebDriver driver) throws InterruptedException {
		driver.get("http://localhost:3000");
		Thread.sleep(7500);

		WebElement filterT = driver.findElement(By.id("floatFilter"));
		filterT.click();
		Thread.sleep(2500);
		WebElement categoriesL = driver.findElement(By.xpath("//*[@id='selC']"));
		categoriesL.click();
		Thread.sleep(1000);

		//first element in drop down
		WebElement categoriesS = driver.findElement(By.xpath("/html/body/div[2]/div[3]/ul/li[1]"));
		categoriesS.click();
		Thread.sleep(1000);
		WebElement submitb = driver.findElement(By.id("sub"));
		submitb.click(); 
		Thread.sleep(4000);

		Integer i;
		for(i = 2; i < 31; i++) {
			categoriesL.click();
			String num = Integer.toString(i);
			categoriesS = driver.findElement(By.xpath("/html/body/div[2]/div[3]/ul/li[" + num +"]"));
			categoriesS.click();
			Thread.sleep(1000);
			submitb.click(); 
			Thread.sleep(5000);
		}

		Thread.sleep(5000);
		driver.quit();
	}

	public static void filterDate(WebDriver driver) throws InterruptedException {
		driver.get("http://localhost:3000");
		Thread.sleep(7500);

		WebElement filterT = driver.findElement(By.id("floatFilter"));
		filterT.click();
		Thread.sleep(2500);
		WebElement categoriesL = driver.findElement(By.xpath("//*[@id='selD']"));
		categoriesL.click();
		Thread.sleep(1000);

		//first element in drop down
		WebElement categoriesS = driver.findElement(By.xpath("/html/body/div[2]/div[3]/ul/li[1]"));
		categoriesS.click();
		Thread.sleep(1000);
		WebElement submitb = driver.findElement(By.id("sub"));
		submitb.click(); 
		Thread.sleep(4000);
		
		for(int i = 1; i < 5; i++) {
			categoriesL.click();
			String num = Integer.toString(i);
			categoriesS = driver.findElement(By.xpath("/html/body/div[2]/div[3]/ul/li[" + num +"]"));
			categoriesS.click();
			Thread.sleep(1000);
			submitb.click(); 
			Thread.sleep(5000);
		}
		
		Thread.sleep(5000);
		driver.quit();
	}
}